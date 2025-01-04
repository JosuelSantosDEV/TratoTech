import itensService from "services/itens";
import createTask from "./utils/createTask";

import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addItens } from "store/reducers/itens";
import { loadOneCategory } from "store/reducers/categorias";

export const itensListener = createListenerMiddleware();

itensListener.startListening({
    actionCreator: loadOneCategory,
    effect: async (action, {fork, dispatch, unsubscribe, getState}) => {
        const {itens} = getState();

        if(itens.length >= 25) return unsubscribe()

        const categoryName = action.payload;

        const itensExists = itens.some(item => item.categoria === categoryName);

        if(itensExists) return

        await createTask({
            fork,
            dispatch,
            action: addItens,
            search: () => itensService.fetchByCategory(categoryName),
            loadingText: `Loading items from the ${categoryName} category`,
            sucessText: `${categoryName} category items loaded successfully`,
            rejectedText: `There was an error fetching data from the itens`
        });
    }
})