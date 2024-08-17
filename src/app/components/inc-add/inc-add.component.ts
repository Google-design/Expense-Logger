import { Component, OnInit, Input } from '@angular/core';
import { IonInput, IonTextarea, IonSelect } from '@ionic/angular';
import { ModalController, ToastController } from '@ionic/angular';
import { Income } from 'src/app/classes/income';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-inc-add',
  templateUrl: './inc-add.component.html',
  styleUrls: ['./inc-add.component.scss'],
})
export class IncAddComponent  implements OnInit {

  @Input('date') date: Date = new Date();

  incomeTypes: any[] = [
    { name: 'Salary', description: 'Monthly salary income', type: 'salary', icon: 'add-circle' },
    { name: 'Freelance', description: 'Income from freelance work', type: 'freelance', icon: 'add-circle' },
    { name: 'Investments', description: 'Income from investments', type: 'investments', icon: 'add-circle' },
    { name: 'Side Hustle', description: 'Income from a side business', type: 'side-hustle', icon: 'add-circle' },
    { name: 'Bonuses', description: 'Additional income from bonuses', type: 'bonuses', icon: 'add-circle' },
    { name: 'Trading', description: 'Trading profits', type: 'investments', icon: 'add-circle' }
];

  constructor(private modalController: ModalController, private toastController: ToastController, private expenseService: ExpenseService) { }

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss();
  }

  addIncome(amount: IonInput, description: IonTextarea, type: IonSelect){
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

    const income = new Income(Number(amount.value), type.value, description.value!, this.date);       //exclammation mark
    this.expenseService.addIncome(income);
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
    header: 'Income Type',
    subHeader: 'Select your income type',
    message: 'Only select one type'
  };

}
