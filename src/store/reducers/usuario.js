import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

const usuarioSlice = createSlice({
    initialState,
    name: "usuario",
    reducers:{
        addUsuario: (state, {payload}) => {
            return payload
        }
    }
});

export const {addUsuario} = usuarioSlice.actions;

export default usuarioSlice.reducer;