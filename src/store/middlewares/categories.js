import {createListenerMiddleware} from "@reduxjs/toolkit";
import categoriesService from "services/categories";
import { addOneCategory, loadOneCategory} from "store/reducers/categorias";
import createTask from "./utils/createTask";


export const categoriesListener = createListenerMiddleware();

// categoriesListener.startListening({
//   actionCreator: loadCategories,
//   effect: async (action, {dispatch, fork, unsubscribe})=>{
//     const response = await createTask({
//         fork,
//         dispatch,
//         action: addAllCategories,
//         search: categoriesService.fetch,
//         loadingText: "Fetch datas of categories",
//         sucessText: "Fetch datas with sucessfull",
//         rejectedText: "There was an error"
//     });
//     if(response.status === "ok") unsubscribe()
//   }
// });

categoriesListener.startListening({
    actionCreator: loadOneCategory,
    effect: async (action, {fork, dispatch, unsubscribe, getState}) => {
        const {categorias} = getState();
        const categoryName = action.payload;
        const categoryExists = categorias.some(category => category.id === categoryName);

        if(categoryExists) return;
        if(categorias.length >= 5) return unsubscribe()

        await createTask({
            fork,
            dispatch,
            action: addOneCategory,
            search: () => categoriesService.fetchOne(categoryName),
            loadingText: `Fetch datas of category ${categoryName}`,
            sucessText: `${categoryName} category data successfully fetched`,
            rejectedText: `There was an error fetching data from the ${categoryName} category`
        });
    }
})