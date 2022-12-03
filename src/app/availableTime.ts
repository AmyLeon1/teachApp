import {availableDate} from "./availableDate";
import {AppDate} from "./AppDate";

export class availableTime{

  id:number
  time:string
  availableDate:availableDate[]
  appDate: AppDate[]

  constructor(time:string) {
  }

}
