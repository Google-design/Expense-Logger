import { Component, ViewChild } from '@angular/core';
import { AddComponent } from '../components/add/add.component';
import { IonDatetime, ModalController, PopoverController } from '@ionic/angular';
import { Expense, ExpenseInterface } from '../classes/expense';
import { ExpenseService } from '../services/expense.service';
import { format, parseISO } from 'date-fns';
import { CalComponent } from '../components/cal/cal.component';
import { IncAddComponent } from '../components/inc-add/inc-add.component';
import { IncomeInterface } from '../classes/income';
import { ChartComponent } from '../components/chart/chart.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonDatetime) datetime!: IonDatetime;
  dateValue2 = new Date(Date.now()).toISOString();

  selectedDate: Date = new Date();
  expenses: ExpenseInterface[] = [];
  incomes: IncomeInterface[] = [];
  todaysTotal: number = 0;
  showCalendar: boolean = false;

  constructor(private modalController: ModalController, public expenseService: ExpenseService, private popoverController: PopoverController) {
    this.expenseService.expenseObservable.subscribe(expensesArray => {
      this.expenses = expensesArray;
    })

    this.expenseService.incomesObservable.subscribe(incomeArray => {
      this.incomes = incomeArray;
    })

    this.expenseService.todayTotalObservable.subscribe(value => {
      this.todaysTotal = value;
    })
  }

  removeExpense(index: number): void{
    this.expenseService.removeExpense(index);
  }

  removeIncome(index: number): void{
    this.expenseService.removeIncome(index);
  }

  filterWithDate(){
    this.expenseService.getDaySpecificExpenses(this.expenseService.getSpecificDate(this.selectedDate)).then(() => {
      this.expenseService.initTodaysTotal();
    });
    this.expenseService.getDaySpecificIncomes(this.expenseService.getSpecificDate(this.selectedDate)).then(() => {
      this.expenseService.initTodaysTotal();
    });
  }

  confirm(){
    this.datetime.confirm(true);
  }
  reset(){
    this.datetime.reset(new Date(Date.now()).toISOString());
  }
  cancel(){
    this.datetime.cancel(true);
  }

  async presentAddComponent() {
    const modal = await this.modalController.create({
      component: AddComponent,
      componentProps: { date: this.expenseService.getSpecificDate(this.selectedDate) }
    });
    return await modal.present();
  }

  async presentAddIncComponent() {
    const modal = await this.modalController.create({
      component: IncAddComponent,
      componentProps: { date: this.expenseService.getSpecificDate(this.selectedDate) }
    });
    return await modal.present();
  }

  async presentCalComponent() {
    const modal = await this.modalController.create({
      component: CalComponent,
      componentProps: { date: this.expenseService.getSpecificDate(this.selectedDate) }
    });
    return await modal.present();
  }
  async presentChartComponent() {
    const modal = await this.modalController.create({
      component: ChartComponent,
      componentProps: { date: this.expenseService.getSpecificDate(this.selectedDate) }
    });
    return await modal.present();
  }
}
