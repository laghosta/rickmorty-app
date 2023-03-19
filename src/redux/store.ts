import {configureStore} from "@reduxjs/toolkit";
import characters from './charactersSlice'
export const store  = configureStore({
    reducer:{
        characters
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch