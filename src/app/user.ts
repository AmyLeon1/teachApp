import {FileHandler} from "./file-handler";

export class User {
  //speicify fields similarly to java
  id:number;
  auth_user_id:number;
  email:string;
  username:string;
  password:string;
  role:string;
  picture:FileHandler;

  constructor() {
  }
  //
  // constructor(id:number,
  // email:string,
  // username:string,
  // password:string){
  //   this.id=id;
  //   this.email=email;
  //   this.username=username;
  //   this.password=password;
  //
  // }

}
