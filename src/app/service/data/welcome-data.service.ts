import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

//create class to define structure of response
export class HelloWorldBean{
  constructor(public message:string){}
}


@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  //http client
  constructor(
    private http:HttpClient
  ) { }

  //similar to generics in Java - pass in HelloWorldBean as that is what we are expecting back
  executeHelloWorldBeanService(){
    return this.http.get<HelloWorldBean>("http://localhost:8080/hello-bean")

  }

  executeHelloWorldServiceWithPathVariable(name:string){

    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    //create instance of HttpHeaders and pass in the object with Authorization
    //value populated

    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // })
    //forgot full url
    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-person/path-variable/${name}`,
      //{headers}
       );
  }

  //This is not used as we have http intereptor
  // createBasicAuthenticationHttpHeader(){
  //   let username = "AmyLeon"
  //   let password = "dummy"
  //   //btoa encoding
  //   let basicAuthHeaderString = "Basic" + window.btoa(username + ":" + password);
  //   return basicAuthHeaderString;
  // }



}
