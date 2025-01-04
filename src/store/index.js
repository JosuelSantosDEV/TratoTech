import { configureStore } from "@reduxjs/toolkit";
import categoriasSlice from "./reducers/categorias";
import itensSlice from "./reducers/itens";
import carrinho from "./reducers/carrinho";
import buscaSlice from "./reducers/busca";
import { categoriesListener } from "./middlewares/categories";
import { itensListener } from "./middlewares/itens";
import createSagaMiddleware from "redux-saga";
import { categoriesSaga } from "./sagas/categories";
import { carrinhoSaga } from "./sagas/carrinho";
import usuarioSlice from "./reducers/usuario";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinho,
    busca: buscaSlice,
    usuario: usuarioSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(
    categoriesListener.middleware,
    itensListener.middleware,
    sagaMiddleware
  ),
});

sagaMiddleware.run(categoriesSaga)
sagaMiddleware.run(carrinhoSaga);

export default store;
