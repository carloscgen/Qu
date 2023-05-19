import axios from "axios";
import { IErrorResponse } from "../interfaces/error";

export interface IChar {
    name: string
    height: string, 
    mass: string, 
}

export const GetCharacter = async (residents: string[]) => {
    let chars: any = [];
    if(residents){
        for (let index = 0; index < residents.length; index++) {
            try {
                const { data } = await axios.get<IChar>(residents[index]);
                chars.push(data);   
            } catch (error) {
                const res = error as IErrorResponse;
                console.log(error);
                return res;
            }
        }
        
    }
    return chars;
}