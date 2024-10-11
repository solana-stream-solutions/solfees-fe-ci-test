import {create} from "zustand";


export interface SlotContent {
  commitment:                string;
  feeAverage:                number;
  feeLevels:                 number[];
  hash:                      string;
  height:                    number;
  leader:                    string;
  slot:                      number;
  time:                      number;
  totalFee:                  number;
  totalTransactions:         number;
  totalTransactionsFiltered: number;
  totalTransactionsVote:     number;
  totalUnitsConsumed:        number;
}
export interface StatusUpdate {
  commitment: string;
  slot:       number;
}


interface WebSocketState {
  isConnected: boolean;
  socket: WebSocket | null;
  connect: () => void;
  disconnect: () => void;
  slots: SlotContent[]
}
interface ServerAnswer {
  result: Array<{slot: SlotContent}>
}



export const useWebSocketStore = create<WebSocketState>((set) => ({
  socket: null,
  slots: [],
  isConnected: false,
  connect: () => {
    set((state: WebSocketState) => {
      const queue:MessageEvent[] = [];

      // - показываем спин загрузки
      // - подписываемся на слоты и новые складываем в буфер
      // - как только пришёл ответ, что подписка сделана, то делаем хттп запрос на все слоты
      // - убираем спин и показываем ответ что получили
      // - докидываем слоты из буфера в таблицу
      // - новые слоты без буфера сразу отправляем в таблицу
      // - держим максимум 150 последних слотов
      if (state.socket) return state

      const url = 'wss://api.solfees.io/api/solfees/ws'
      const socket = new WebSocket(url);

      socket.onopen = () => {
        socket.send(`{"id":0,"method":"SlotsSubscribe","params":{"readWrite":[],"readOnly":[],"levels":[5000,9500]}}`)
        set({socket});
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
        const data = JSON.parse(event.data) as any
        if (data.result.slot) {
          const update = data.result.slot as SlotContent
          set((state:WebSocketState) => {
            const slots = [...state.slots.slice(-149), update]
            return {...state, slots};
          })
          return;
        }
        if (data.result.status) {
          const update = data.result.status as StatusUpdate
          set((state:WebSocketState) => {
            const slots = state.slots.map(elt => {
              if(elt.slot === update.slot) return {...elt, ...update}
              return elt;
            })
            return {...state, slots};
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
          params: [{"readWrite":[],"readOnly":[],"levels":[5000,9000]}],
          id: '1'
        })
      })
      .then(response => response.json() as Promise<ServerAnswer>)
      .then(serverData => {
        set({isConnected: true, slots: serverData.result.map(elt => elt.slot)})
        // socket.onmessage = handleMessage
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
