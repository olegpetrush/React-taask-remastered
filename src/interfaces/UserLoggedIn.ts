import { string } from "prop-types"
import { Administrator } from "./Administrator";
import { Merchant } from "./Merchant";
import { Consumer } from "./Consumer";

export interface UserLoggedIn{
    role:string;
    token:string;
    username:string;
    user_object:Merchant|Consumer|Administrator;
}