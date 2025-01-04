import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import itensService from "services/itens";
import { v4 as uuid } from "uuid";
import { resetarCarrinho } from "./carrinho";
import { createStandaloneToast } from "@chakra-ui/toast";

const {toast} = createStandaloneToast();

const initialState = [];


export const fetchItens = createAsyncThunk(
  "itens/fetch",
  itensService.fetch
);


const itensSlice = createSlice({
  name: "itens",
  initialState,
  reducers: {
    mudarFavorito: (state, { payload }) => {
      state = state.map((item) => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      });
    },
    registerItem: (state, {payload}) => {
      state.push({...payload, id: uuid()});
    },
    changeItem : (state, {payload}) =>{
      const index = state.findIndex(item => item.id === payload.id);
      if(index !== -1) Object.assign(state[index], payload.item);
    },
    deleteItem: (state, {payload}) => {
      const index = state.findIndex(item => item.id === payload.id);
      if(index !== -1) state.splice(index, 1);
    },
    addItens (state, {payload}){
      state.push(...payload)
    }
  },
  extraReducers: builder => {
    builder
    .addCase(
      fetchItens.pending,
      (_, action) => {}
    )
    .addCase(
      fetchItens.fulfilled,
      (_, action) => {
        return action.payload;
      }
    )
    .addCase(
      fetchItens.rejected,
      (_, action) => {}
    )
    .addCase(
      resetarCarrinho.type,
      () => {
        toast({
          title: "Sucess",
          description: "Purchase made successfully",
          status:"success",
          duration: 2000,
          isClosable: true
        })
      }
    )
  }
});

export const { mudarFavorito, registerItem, changeItem , deleteItem, addItens} = itensSlice.actions;
export default itensSlice.reducer;
