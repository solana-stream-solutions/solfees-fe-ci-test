import {create} from "zustand";

interface WebSocketState {
  socket: WebSocket | null;
  connect: () => void;
  disconnect: () => void;
  slots: Record<number, any>
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
  socket: null,
  slots: {},
  connect: () => {
    set(state => {
      if (state.socket) return state

      const url = 'wss://api.solfees.io/api/solfees/ws'
      const socket = new WebSocket(url);

      socket.onopen = () => {
        socket.send(`{"id":0,"method":"SlotsSubscribe","params":{"readWrite":[],"readOnly":["TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"],"levels":[5000,9500]}}`)
        set({socket});
      };
      socket.onclose = () => {
        set({
          socket: null,
        });
      };
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      socket.onmessage = (event) => {
        // console.log("WebSocket message:", event.data);
        const data = JSON.parse(event.data) as any
        if (data.result.slot) {
          set(state => {
            const newSlots = {...state.slots}
            newSlots[data.result.slot.slot] = data.result.slot
            return ({
              ...state,
              slots: newSlots,
            })
          })
        }
        if (data.result.status) {
          set(state => {
            if (state.slots[data.result.status.slot]) {
              const newSlots = {...state.slots}
              newSlots[data.result.status.slot] = {
                ...newSlots[data.result.status.slot],
                commitment: data.result.status.commitment,
              }
              return ({
                ...state,
                slots: newSlots,
              })
            }
            return state;
          })
        }
      };

      return {
        ...state,
        socket,
      }
    })

  },
  disconnect: () => {
    set((state) => {
      state.socket?.close();
      return {
        socket: null,
      };
    });
  },
}));
// можешь пока закинуть в табличку slot, commitment, total_transactions, fee_average, total_units_consumed
// т.е. добавляешь слот в табличку, потом при статусе меняешь коммитмент
