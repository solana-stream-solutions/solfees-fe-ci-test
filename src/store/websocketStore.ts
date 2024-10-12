import {create} from "zustand";


export interface SlotContent {
  commitment: CommitmentStatus;
  feeAverage: number;
  feeLevels: number[];
  hash: string;
  height: number;
  leader: string;
  slot: number;
  time: number;
  totalFee: number;
  totalTransactions: number;
  totalTransactionsFiltered: number;
  totalTransactionsVote: number;
  totalUnitsConsumed: number;
}

export interface StatusUpdate {
  commitment: CommitmentStatus;
  slot: number;
}

export type CommitmentStatus = 'processed' | 'confirmed' | 'finalized';

interface WebSocketState {
  socket: WebSocket | null;
  isConnected: boolean;
  slots: SlotContent[]
  slots2: Record<string, SlotContent[]>
  readonlyKeys: string[],
  readwriteKeys: string[],
  percents: number[],
  connect: () => void;
  disconnect: () => void;
  updateSubscription: () => void;
  updatePercents: (arg: number[]) => void;
  updateReadonlyKeys: (arg: string[]) => void;
  updateReadwriteKeys: (arg: string[]) => void;
}

interface ServerAnswer {
  result: Array<{
    slot: SlotContent
  }>
}


export const useWebSocketStore = create<WebSocketState>((set) => ({
  socket: null,
  isConnected: false,
  slots: [],
  slots2: {},
  readonlyKeys: [],
  readwriteKeys: [],
  percents: [5000, 9500],
  updatePercents: (percents) => {
    set({percents})
  },
  updateReadonlyKeys: (readonlyKeys) => {
    if(JSON.stringify(readonlyKeys) === JSON.stringify([""])) return;
    set({readonlyKeys})
  },
  updateReadwriteKeys: (readwriteKeys) => {
    // сюда еще проверку валидности ключа надо положить, пока обработал корнеркейсы
    if(JSON.stringify(readwriteKeys) === JSON.stringify([""])) return;
    set({readwriteKeys})
  },
  updateSubscription: () => {
    set((state: WebSocketState) => {
      if(state.socket) {
        const data = {
          "id": 0,
          "method": "SlotsSubscribe",
          "params": {
            "readWrite": state.readwriteKeys,
            "readOnly": state.readonlyKeys,
            "levels": state.percents,
          },
        }
        state.socket.send(JSON.stringify(data))
      }
      return state;
    })
  },
  connect: () => {
    set((state: WebSocketState) => {
      const queue: MessageEvent[] = [];
      let lastProcessedTime = Date.now();

      if (state.socket) return state

      const url = 'wss://api.solfees.io/api/solfees/ws'
      const socket = new WebSocket(url);

      socket.onopen = () => {
        set({socket});
        state.updateSubscription();
      };
      socket.onclose = () => {
        set({
          socket: null,
          isConnected: false,
        });
      };
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      const handleMessage = (event: MessageEvent) => {
        function handle2(event: MessageEvent) {
          const data = JSON.parse(event.data) as any
          if (data.result.slot) {
            const update = data.result.slot as SlotContent
            set((state: WebSocketState) => {
              const groupIdx = (update.slot/4)|0;

              const slots2 = state.slots2;
              slots2[groupIdx]  = slots2[groupIdx] || [];
              slots2[groupIdx].push(update);
              const keys = Object.keys(slots2);
              if(keys.length > 38) {
                const target = Math.min(...keys.map(Number))
                delete slots2[target]
              }

              return {
                ...state,
                slots2:{...slots2},
              };
            })
            return;
          }
          if (data.result.status) {
            const update = data.result.status as StatusUpdate
            set((state: WebSocketState) => {
              const groupIdx = (update.slot/4)|0;

              const slots2 = state.slots2;
              if(!slots2[groupIdx]) {
                // console.warn('no update for groupId:', groupIdx, 'slot:', update.slot, update.commitment)
                return state;
              }

              const newSlots = slots2[groupIdx].map(elt => {
                if (elt.slot === update.slot) return {...elt, ...update}
                return elt;
              })
              slots2[groupIdx] = newSlots;

              return {
                ...state,
                slots2: {...slots2},
              };
            })
            return;
          }
          if(data.result === 'subscribed') {
            // Это сообщение, что подписка удалась и нет проблем
            return;
          }
          console.log('unrecognized2', data);
        }
        handle2(event);
        return; // Пока заглушка
        const data = JSON.parse(event.data) as any
        if (data.result.slot) {
          const update = data.result.slot as SlotContent
          set((state: WebSocketState) => {
            const slots = [...state.slots.slice(-149), update]
            return {
              ...state,
              slots,
            };
          })
          return;
        }
        if (data.result.status) {
          const update = data.result.status as StatusUpdate
          set((state: WebSocketState) => {
            const slots = state.slots.map(elt => {
              if (elt.slot === update.slot) return {...elt, ...update}
              return elt;
            })
            return {
              ...state,
              slots,
            };
          })
          return;
        }
        console.log('unrecognized', data);
      }
      socket.onmessage = (event) => {
        queue.push(event)
      };


      fetch('https://api.solfees.io/api/solfees', {
        method: 'POST',
        body: JSON.stringify({
          method: 'getRecentPrioritizationFees',
          jsonrpc: '2.0',
          params: [
            {
              "readWrite": state.readwriteKeys,
              "readOnly": state.readonlyKeys,
              "levels": state.percents,
            },
          ],
          id: '1',
        }),
      })
      .then(response => response.json() as Promise<ServerAnswer>)
      .then(serverData => {
        //----
        const slots2 = serverData.result.reduce((acc, elt) => {
          const groupIdx = (elt.slot.slot/4)|0;

          acc[groupIdx]  = acc[groupIdx] || [];
          acc[groupIdx].push(elt.slot);
          return acc;
        }, {} as Record<string, SlotContent[]>)

        //----
        set({
          isConnected: true,
          slots: serverData.result.map(elt => elt.slot),
          slots2,
        })
        socket.onmessage = function (e: MessageEvent) {
          queue.push(e)
          // Костыль для перфоманса, можно ставить 1 сек и обновления будет меньше
          if(Date.now() - lastProcessedTime > 125) {
            queue.length > 100 && console.log('queued from WS:', queue.length);
            // TODO перевернуть список, проверить что порядок слотов на месте.
            queue.forEach(handleMessage)
            queue.length = 0;
            lastProcessedTime = Date.now();
          }
        }
        queue.forEach(handleMessage)
        queue.length = 0;
      })
      .catch(error => console.error('Error:', error));

      return state;
    })
  },
  disconnect: () => {
    set((state) => {
      state.socket?.close();
      return {
        socket: null,
        isConnected: false,
      };
    });
  },
}));
// можешь пока закинуть в табличку slot, commitment, total_transactions, fee_average, total_units_consumed
// т.е. добавляешь слот в табличку, потом при статусе меняешь коммитмент
