import { Country } from "./Country";

export interface Consumer{
    id: number;
    email: string;
    full_name: string;
    address: string;
    zip: string;
    city: string;
    phone: string;
    country: Country;
    password: string;
}