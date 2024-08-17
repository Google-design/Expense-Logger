import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent  implements OnInit {
  @ViewChild('barChart') barChart: any;
  bars: any;
  color: string = '#26c281';
  Type: any = 'line';
  ionViewDidEnter() {
    this.createBarChart();
  }
  createBarChart() {
    // Destroy existing chart if it exists
    if (this.bars) {
      this.bars.destroy();
    }

    // Create new chart
    this.bars = new Chart(this.barChart.nativeElement, {
      type: this.Type,
      data: {
        labels: ['1', '4', '7', '10', '13', '17', '20', '23', '26', '29', '31'],
        datasets: [{
          label: 'Viewers in millions',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17, 20, 22, 25],
          backgroundColor: this.color, // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            ticks:{
              display: true,
            }
          }
        }
      }
    });
  }

  onTypeChange(event: any) {
    this.Type = event.detail.value;
    this.createBarChart();
  }

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss();
  }
}
