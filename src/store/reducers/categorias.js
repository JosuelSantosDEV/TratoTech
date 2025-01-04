
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesService from "services/categories";


const initialState = [];

export const loadCategories = createAction("categories/load");
export const loadOneCategory = createAction("categories/loadOne");

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  categoriesService.fetch
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {
    addCategories(state, {payload}){
      state.push(...payload);
    },
    addOneCategory(state, {payload}){
      state.push({...payload});
    },
    addAllCategories: (state, action) =>{
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(
      fetchCategories.pending,
      (state, action) => {
        
      }
    )
    .addCase(
      fetchCategories.fulfilled,
      (state, action) => {
        return action.payload;
      }
    )
    .addCase(
      fetchCategories.rejected,
      (state, action) => {
        
      }
    )
  }
});
export const {addCategories, addAllCategories, addOneCategory} = categoriasSlice.actions;
export default categoriasSlice.reducer;
