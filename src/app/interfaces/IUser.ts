import {Status} from '../enum/statusEnum'
export interface IUser {
    nick:string;
    password?:string;
    subnick?:string;
    age?:number;
    email:string;
    friend?:boolean;
    uid:any;
    status?:Status
}