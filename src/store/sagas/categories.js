import {call, put, takeLatest} from "redux-saga/effects"
import { addAllCategories, loadCategories } from "store/reducers/categorias"
import { createStandaloneToast } from "@chakra-ui/toast";
import categoriesService from "services/categories";

const {toast} = createStandaloneToast()

function* observeCategories (){
    
    toast({
        title: "Loanding",
        description: "Fetch datas of categories",
        status:"loading",
        duration: 2000,
        isClosable: true
    })

    try {

        const categories = yield call(categoriesService.fetch);
        
        toast({
            title: "Sucess",
            description: "Fetch datas with sucessfull",
            status:"success",
            duration: 2000,
            isClosable: true
        });
        yield put(addAllCategories(categories));
        
        
    } catch (error) {
        toast({
            title: "Error",
            description: "There was an error",
            status:"error",
            duration: 2000,
            isClosable: true
        });   
    }
}

export function* categoriesSaga (){
    const task = yield takeLatest(loadCategories, observeCategories);
    yield takeLatest(addAllCategories, () => task.cancel());
}