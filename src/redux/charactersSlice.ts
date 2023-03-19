import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {ICharacter, IGetOneProps, IInitialState, IMainReqProps, IMainRes, ISecReqProps} from "./types";

export const getAllCharacters = createAsyncThunk("characters/getAll", async({page}:IMainReqProps):Promise<IMainRes>=> {
    const {data} = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
    return data
})
export const getCharactersByName = createAsyncThunk("characters/getAllByName", async({page=1, name}:ISecReqProps):Promise<IMainRes>=> {
    const {data} = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`)
    return data
})
export const getOneCharacter = createAsyncThunk("characters/getOne", async({id}:IGetOneProps):Promise<ICharacter>=> {
    const {data} = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
    return data
})

const initialState:IInitialState = {
    data: null,
    status: "loading",
    searchValue : "",
    currentPage : 1,
    resultsCount:0,
}
const charactersSlice = createSlice({
    name:"characters",
    initialState,
    reducers:{
        setCurrentPage:(state, action)=>{
            state.currentPage = action.payload
        },
        setSearchValue:(state, action)=>{
            state.searchValue = action.payload
        }
    },
    extraReducers:
    builder => {
        builder.addCase(getAllCharacters.pending, (state)=> {
            state.data = []
            state.status = "loading"
        })
        builder.addCase(getAllCharacters.fulfilled, (state, action)=> {
            state.data = action.payload.results.sort((a, b) => a.name.localeCompare(b.name))
            state.resultsCount = action.payload.info.count
            state.status = "loaded"
        })
        builder.addCase(getAllCharacters.rejected, (state)=> {
            state.data = null
            state.status = "loaded"
        })
        builder.addCase(getCharactersByName.pending, (state)=> {
            state.data = []
            state.status = "loading"
        })
        builder.addCase(getCharactersByName.fulfilled, (state, action)=> {
            state.data = action.payload.results.sort((a, b) => a.name.localeCompare(b.name))
            state.resultsCount = action.payload.info.count
            state.status = "loaded"
        })
        builder.addCase(getCharactersByName.rejected, (state)=> {
            state.data = null
            state.status = "loaded"

        })
        builder.addCase(getOneCharacter.pending, (state)=> {
            state.data = []
            state.status = "loading"
        })
        builder.addCase(getOneCharacter.fulfilled, (state, action)=> {
            state.data = [action.payload]
            state.status = "loaded"
        })
        builder.addCase(getOneCharacter.rejected, (state)=> {
            state.data = null
            state.status = "loaded"

        })
    }
})
export const {setCurrentPage, setSearchValue} = charactersSlice.actions
export default charactersSlice.reducer