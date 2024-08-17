import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';

@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.scss'],
})
export class CalComponent  implements OnInit {
  @ViewChild('calendar') calendar!: MatCalendar<Moment>;
  selectedDate!: Moment;


  constructor(private modalController: ModalController, private _renderer: Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit() {
    const monthPrevBtn = document.querySelectorAll('.mat-calendar-previous-button');
    const monthNextBtn = document.querySelectorAll('.mat-calendar-next-button');

    if (monthPrevBtn) {
      Array.from(monthPrevBtn).forEach((button) => {
        this._renderer.listen(button, 'click', (event) => {
          this.updateCalendar();
        });
      });
    }

    if (monthNextBtn) {
      Array.from(monthNextBtn).forEach((button) => {
        this._renderer.listen(button, 'click', (event) => {
          this.updateCalendar();
        });
      });
    }

    this.updateCalendar();
  }

  handleMonthSelected(event: any) {
    this.updateCalendar();
  }

  updateCalendar() {
    setTimeout(() => {
      const cells = Array.from(document.querySelectorAll<HTMLDivElement>('.mat-calendar .mat-calendar-body-cell-content'));

      cells.forEach(c => {
        c.innerText = c.innerText.length == 1 ? '0' + c.innerText : c.innerText;
        c.innerHTML = '<div class="row"><div class="col-12" style="font-size:1.5em;">' + c.innerText + '</div><div class="col-12">' + 1 + '</div></div>';//TODO: check date and data and use number from that.
      });

    });
  }

  dismissModal(){
    this.modalController.dismiss();
  }

}
