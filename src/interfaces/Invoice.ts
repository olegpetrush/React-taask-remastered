export interface Invoice{
    status: "paid"|"open";
    collection_method: "direct_debit"|"payment_card"
    total: number;
    due_date: Date | string;
    date: Date | string;
    invoice_number: number;
}