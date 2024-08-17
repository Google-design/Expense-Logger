import { uuidv7 } from "uuidv7";

export interface ExpenseInterface {
    id: string;
    amount: number;
    type: string;
    description: string;
    date: Date;
}

export class Expense implements ExpenseInterface{
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
