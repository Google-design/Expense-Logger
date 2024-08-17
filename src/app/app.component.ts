import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ExpenseService } from './services/expense.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private plaform: Platform,
    private expenseService: ExpenseService
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.plaform.ready().then(() => {
      this.expenseService.getDataFromStorage().then(() => {
        this.expenseService.initTodaysTotal(); 
      });
      
      // If you want to get incomes
      this.expenseService.getDataFromStorage(true).then(() => {
        this.expenseService.initTodaysTotal();
      });
    });
  }
}
