import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { IonInput, IonTextarea, IonSelect } from '@ionic/angular';
import { Expense } from 'src/app/classes/expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent  implements OnInit {

  @Input('date') date: Date = new Date();   // forcedly initialized the date to new Date()

  expenseTypes: any[] = [
    { name: 'General', description: 'General expenses', type: 'miscellaneous', icon: 'add-circle' },
    { name: 'Food', description: 'Daily grocery expenses', type: 'groceries', icon: 'add-circle' },
    { name: 'Dining Out', description: 'Restaurant and dining expenses', type: 'dining', icon: 'add-circle' },
    { name: 'Groceries', description: 'Weekly/Daily grocery shopping', type: 'groceries', icon: 'add-circle' },
    { name: 'Movies', description: 'Entertainment expenses for movies', type: 'entertainment', icon: 'add-circle' },
    { name: 'Clothing', description: 'Clothing and apparel expenses', type: 'shopping', icon: 'add-circle' },
    { name: 'Games', description: 'Expenses related to gaming', type: 'entertainment', icon: 'add-circle' },
    { name: 'Sports', description: 'Sports and fitness expenses', type: 'fitness', icon: 'add-circle' },
    { name: 'Electronics', description: 'Expenses for electronic devices', type: 'technology', icon: 'add-circle' },
    { name: 'Furniture', description: 'Furniture and home decor expenses', type: 'home', icon: 'add-circle' },
    { name: 'Maintenance', description: 'Home maintenance expenses', type: 'home', icon: 'add-circle' },
    { name: 'Mortgage', description: 'Monthly mortgage payments', type: 'home', icon: 'add-circle' },
    { name: 'Pets', description: 'Expenses for pet care', type: 'pets', icon: 'add-circle' },
    { name: 'Rent', description: 'Monthly rent payments', type: 'home', icon: 'add-circle' },
    { name: 'Services', description: 'Service-related expenses', type: 'services', icon: 'add-circle' },
    { name: 'Gifts', description: 'Expenses for gifts', type: 'gifts', icon: 'add-circle' },
    { name: 'Insurance', description: 'Insurance premiums', type: 'insurance', icon: 'add-circle' },
    { name: 'Medical', description: 'Medical and healthcare expenses', type: 'health', icon: 'add-circle' },
    { name: 'Taxes', description: 'Tax-related expenses', type: 'taxes', icon: 'add-circle' },
    { name: 'Cleaning', description: 'Cleaning and household expenses', type: 'home', icon: 'add-circle' },
    { name: 'Electricity', description: 'Electricity bills', type: 'utilities', icon: 'add-circle' },
    { name: 'Gas', description: 'Gas and fuel expenses', type: 'utilities', icon: 'add-circle' },
    { name: 'Internet', description: 'Internet service expenses', type: 'utilities', icon: 'add-circle' },
    { name: 'Mobile', description: 'Mobile phone expenses', type: 'utilities', icon: 'add-circle' },
    { name: 'Other', description: 'Other miscellaneous expenses', type: 'miscellaneous', icon: 'add-circle' }
  ];

  constructor(private modalController: ModalController, private toastController: ToastController, private expenseService: ExpenseService) { }

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss();
  }

  addExpense(amount: IonInput, description: IonTextarea, type: IonSelect){
    const numberRegex = new RegExp('/^\d+\.\d{0,2}$/');
    if(amount.value?.toString().match(numberRegex) || amount.value == ''){
      this.presentAmountToast();
      return;
    }

    if(description.value == ''){
      this.presentDescToast();
      return;
    }

    if(type.value == undefined){
      this.presentTypeToast();
      return;
    }

    const expense = new Expense(Number(amount.value), type.value, description.value!, this.date);       //exclammation mark
    this.expenseService.addExpense(expense);
    this.dismissModal();
  }

  async presentAmountToast(){
    const toast = await this.toastController.create({
      message: 'Please Enter Correct Amount!',
      duration: 2000,
      position: 'bottom',
      color: 'danger',
      swipeGesture: 'vertical',
    });
    toast.present();
  }

  async presentDescToast(){
    const toast = await this.toastController.create({
      message: 'Please Enter Correct Description!',
      duration: 2000,
      position: 'bottom',
      color: 'danger',
      swipeGesture: 'vertical',
    });
    toast.present();
  }

  async presentTypeToast(){
    const toast = await this.toastController.create({
      message: 'Please Select a Type!',
      duration: 2000,
      position: 'bottom',
      color: 'danger',
      swipeGesture: 'vertical',
    });
    toast.present();
  }

  customPopoverOptions = {
    header: 'Expense Type',
    subHeader: 'Select your expense type',
    message: 'Only select one type'
  };

}
