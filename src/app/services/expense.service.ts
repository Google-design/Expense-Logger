import { Injectable } from '@angular/core';
import { ExpenseInterface } from '../classes/expense';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { IncomeInterface } from '../classes/income';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  todayTotal: number = 0;
  selectedDate: Date;
  expenses: ExpenseInterface[] = [];

  incomes: IncomeInterface[] = [];
  incomesObservable: BehaviorSubject<IncomeInterface[]>;

  expenseObservable: BehaviorSubject<ExpenseInterface[]>;
  todayTotalObservable: BehaviorSubject<number>;

  constructor() {
    this.selectedDate = new Date();
    this.expenseObservable = new BehaviorSubject(this.expenses);
    this.expenseObservable.asObservable();
    this.incomesObservable = new BehaviorSubject(this.incomes);
    this.incomesObservable.asObservable();
    this.todayTotalObservable = new BehaviorSubject(this.todayTotal);
    this.todayTotalObservable.asObservable();
  }

  addExpense(expenseObject: ExpenseInterface){
    this.expenses.unshift(expenseObject);
    this.addTotalExpense(expenseObject.amount);
    this.saveDataToStorage(this.expenses, expenseObject.date).then(success => {
      this.expenseObservable.next(this.expenses);
    });
  }

  addIncome(incomeObject: IncomeInterface){
    this.incomes.unshift(incomeObject);
    this.addTotalIncome(incomeObject.amount);
    this.saveDataToStorage(this.incomes, incomeObject.date).then(() => {
      this.incomesObservable.next(this.incomes);
    });
  }

  addTotalExpense(val: number): void{
    this.todayTotal -= val;
    this.todayTotalObservable.next(this.todayTotal);
  }

  addTotalIncome(val: number): void{
    this.todayTotal += val;
    this.todayTotalObservable.next(this.todayTotal);
  }

  // 2.
  async saveDataToStorage(data: any[], date: Date, isIncome: boolean = false){
    Storage.migrate();
    await Storage.set({key: date.toDateString(), value: JSON.stringify(data)});
  }

  // 3. 
  async getDataFromStorage(isIncome: boolean = false){
    Storage.migrate();
    const key = this.getCurrentDate();

    await Storage.get({key: key}).then(val =>{

      const objects: ExpenseInterface[] = JSON.parse(val.value!);
      if (isIncome) {
        this.incomes = objects;
        this.incomesObservable.next(this.incomes);
      } else {
        this.expenses = objects;
        this.expenseObservable.next(this.expenses);
      }
    });
  }


  async getDaySpecificExpenses(date: Date){
    this.selectedDate = date;
    await Storage.get({key: date.toDateString()}).then(val => {
      this.expenses = [];
      const objects: ExpenseInterface[] = JSON.parse(val.value!);
      if(objects !== null){
        this.expenses = objects;
      } else {
        this.expenses = [];
      }
      this.expenseObservable.next(this.expenses);
    });
  }

  //4.
  async getDaySpecificIncomes(date: Date){
    this.selectedDate = date;
    await Storage.get({key: date.toDateString()}).then(val => {
      this.incomes = [];
      const objects: IncomeInterface[] = JSON.parse(val.value!);
      if(objects !== null){
        this.incomes = objects;
      } else {
        this.incomes = [];
      }
      this.incomesObservable.next(this.incomes);
    });
  }

  removeExpense(index: number): void{
    const deletedAmount = this.expenses[index].amount;
    this.expenses.splice(index, 1);
    this.subtractTotalExpense(deletedAmount);
    this.saveDataToStorage(this.expenses, this.selectedDate);
    this.expenseObservable.next(this.expenses);
  }

  subtractTotalExpense(val: number): void{
    this.todayTotal += val;
    this.todayTotalObservable.next(this.todayTotal);
  }

  removeIncome(index: number): void{
    const deletedAmount = this.incomes[index].amount;
    this.incomes.splice(index, 1);
    this.subtractTotalIncome(deletedAmount);
    this.saveDataToStorage(this.incomes, this.selectedDate);
    this.incomesObservable.next(this.incomes);
  }

  subtractTotalIncome(val: number): void{
    this.todayTotal -= val;
    this.todayTotalObservable.next(this.todayTotal);
  }

  initTodaysTotal(){
    let totalAmount: number = 0;
    this.expenses.forEach(element => {
      totalAmount -= element.amount;
    });
    this.incomes.forEach(element => {
      totalAmount += element.amount;
    });
    this.todayTotal = Math.round(((totalAmount + Number.EPSILON)* 100) / 100);
    this.todayTotalObservable.next(this.todayTotal);
  }

  getCurrentDate(){
    return new Date().toDateString();
  }

  getSpecificDate(date?: Date){
    const newDate = (new Date(date || new Date()));
    return newDate;
  }

  resetApp(){

  }

}
