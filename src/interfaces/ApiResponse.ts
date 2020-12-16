import { AnyAction } from "redux";

export interface ApiResponse{
    result: any;
    message: string[];
    status: string;
    code: number;
}