export interface PaymentMethod{
    type:"CARD"|"DEBIT";
    data: Card|Debit;
}

interface Card{
    pm_string:string;
}
interface Debit{
    reg: string;
    account: string;
}