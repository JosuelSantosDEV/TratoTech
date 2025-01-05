import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {data: [], total: 0};

export const loadPagamento = createAction("carrinho/loadPagamento")
export const finalizarPagamento = createAction('carrinho/finalizarPagamento');


const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState,
  reducers: {
    mudarCarrinho: (state, { payload }) => {
      const temItem = state.data.some((item) => item.id === payload);
      if (!temItem)
        return {
          data:[
            ...state.data, 
            {
              id: payload,
              quantidade: 1,
            }
          ],
          total: state.total
        };
      return {
        data: state.data.filter((item) => item.id !== payload),
        total: state.total,
      };
    },
    mudarQuantidade: (state, { payload }) => {
      state = state.data.map((itemNoCarrinho) => {
        if (itemNoCarrinho.id === payload.id)
          itemNoCarrinho.quantidade += payload.quantidade;
        return itemNoCarrinho;
      });
    },
    resetarCarrinho: () => initialState,
    mudarTotal: (state, {payload}) => {
      state.total = payload;
    }
  },
});

export const { mudarCarrinho, mudarQuantidade, resetarCarrinho, mudarTotal } =
  carrinhoSlice.actions;

export default carrinhoSlice.reducer;
