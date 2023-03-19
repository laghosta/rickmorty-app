import Character from "../components/Character";

export interface ICharacter{
    id: number,
    name:string,
    status:string,
    species:string,
    type: string,
    gender: string,
    origin :{
        name:string,
        url:string
    },
    location:{
        name:string,
        url:string
    },
    image : string,
    episode : string[],
    url:string,
    created : string
}
export interface IMainRes{
    info:{
        count:number,
        pages : number,
        next : string,
        prev : string
    },
    results : ICharacter[]
}
export interface IMainReqProps{
    page:number
}
export interface ISecReqProps{
    page:number
    name : string
}
export interface IGetOneProps{
    id:number
}
export interface IInitialState{
    data : ICharacter[] | null,
    status: string,
    searchValue: string,
    currentPage:number,
    resultsCount:number,
}