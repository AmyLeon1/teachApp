import {FileHandler} from "./file-handler";

export class User {

  id:number;
  auth_user_id:number;
  email:string;
  username:string;
  password:string;
  role:string;
  picture:FileHandler;
  aboutMe:string

  constructor() {
  }

}
