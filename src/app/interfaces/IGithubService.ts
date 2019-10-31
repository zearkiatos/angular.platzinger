export interface IGithubService {
    GetAuthorization(user:string,password:string):any;

    GetUser(username:string):any;
}