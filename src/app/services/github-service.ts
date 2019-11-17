import { Injectable } from '@angular/core';
import { IGithubService } from '../interfaces/IGithubService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GithubService implements IGithubService {

  constructor(private httpClient:HttpClient) { }
  
  GetAuthorization(user: string, password: string):any {
    const url = environment.gitHub.endpoint +"authorizations";
    const httpHeader:HttpHeaders = new HttpHeaders().set("Authorization","Basic "+btoa(user+":"+password));
    let jsonObj={
      "add_scopes":["public_repo"],
      "note":""
    };
    httpHeader.append("x-github-otp","OTP");
    httpHeader.append("Content-Type","application/json");
    return this.httpClient.post(url,jsonObj,{headers: httpHeader})
  }

  GetUser(username:string):any {
    const url = environment.gitHub.endpoint +"users/"+username;
    const httpHeader:HttpHeaders = new HttpHeaders();
    httpHeader.append("x-github-otp","OTP");
    httpHeader.append("Content-Type","application/json");
    return this.httpClient.get(url,{headers: httpHeader})
  }
}
