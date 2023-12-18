import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { category, sortBy, search, currentPage } = params;
        const { data } = await axios.get(
            `https://63dbe3dac45e08a043508e92.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=desc`
        );
        return data;
    }
);

const initialState = {
    items: [],
    status: '',
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = "loading"
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = "success"
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = "error"
                state.items = []
            })
    }
})

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;