import { uuidv7 } from "uuidv7";

export interface IncomeInterface {
    id: string;
    amount: number;
    type: string;
    description: string;
    date: Date;
}

export class Income implements IncomeInterface{
    id: string;
    amount: number;
    type: string;
    description: string;
    date: Date;

    constructor(userAmount: number, userType: string, userDesc: string, userDate?: Date){
        this.id = uuidv7();
        this.amount = userAmount;
        this.type = userType;
        this.description = userDesc;
        this.date = userDate as Date;
    }
}
