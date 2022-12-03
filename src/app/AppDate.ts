import {User} from "./user";
import {availableTime} from "./availableTime";

export class AppDate{
  id:number
  date:string
  users:User[]
  availableTimes: availableTime[]

  constructor(date:string){

  }
}
