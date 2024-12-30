import { createSlice, configureStore } from "@reduxjs/toolkit";
import categoriasSlice from "./reducers/categorias";
import itensSlice from "./reducers/itens";
import carrinho from "./reducers/carrinho";
import buscaSlice from "./reducers/busca";

const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinho,
    busca: buscaSlice,
  },
});

export default store;
