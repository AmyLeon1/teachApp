import {AUTHENTICATED_USER} from "./service/basic-authentication.service";
import {HardCodedAuthenticationService} from "./service/hard-coded-authentication.service";
import {RegistrationService} from "./service/registration.service";
import {User} from "./user";

export class Post{
  // user = new User()


  id:number;
  title:string;
  body:string;
  username:string;


  constructor() {
  }
}
