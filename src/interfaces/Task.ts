import { Urgency } from "./Urgency";
import { Consumer } from "./Consumer";
import { Industry } from "./Industry";
import { SuperOffer } from "./SuperOffer";

export interface Task{
    id:number;
    consumer:Consumer;
    budget: number; 
    urgency: Urgency;
    description:string;
    date_time:Date;
    active:boolean;
    industry:Industry;
    super_offer?: SuperOffer;
}