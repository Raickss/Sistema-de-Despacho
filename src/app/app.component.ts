import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { TESTS } from './tests'
import { FifoService } from './fifo.service';
import { SvjService } from './svj.service';
import { PriorityService } from './priority.service';
import { CalculateTimeService } from './calculate-time.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng-chart';
  chart0: any = [];
  chart1: any = [];
  chart2: any = [];
  names: any
  datas0: any
  datas1: any
  datas2: any
  tests: any

  infoFifo: any = [];
  infoSvj: any = [];
  infoPrio: any = [];

  dataLength: number = TESTS.length;
  randomColors: any;
  constructor(private calculateTiemSerivice: CalculateTimeService, private fifoService: FifoService, private svjService: SvjService, private priorityService: PriorityService) {}

  ngOnInit() {
    this.randomColors = Array.from({ length: this.dataLength }, () => this.getRandomColor());
    this.names = TESTS.map(item => item.task).reverse();
    this.tests= [...TESTS]; 
    this.datas0 = this.fifoService.fifo(this.tests);
    this.tests= [...TESTS]; 
    this.datas1 = this.svjService.svj(this.tests);
    this.tests= [...TESTS]; 
    this.datas2 = this.priorityService.priority(this.tests);
    this.tests= [...TESTS]; 
    this.infoFifo = this.calculateTiemSerivice.fifoCal(this.tests);
    this.tests= [...TESTS]; 
    this.infoSvj = this.calculateTiemSerivice.svjCal(this.tests);
    this.tests= [...TESTS]; 
    this.infoPrio = this.calculateTiemSerivice.prioCal(this.tests);
    this.graph0()
    this.graph1()
    this.graph2()
    this.tests = [...TESTS];
  }
  graph0(){
    this.chart0 = new Chart('canvas0', {
      type: 'bar',
      data: {
        labels: this.names,
        datasets: [
          {
            label: '',
            data: this.datas0,
            backgroundColor: this.randomColors,
            borderColor: this.randomColors.map((c: string) => c.replace(')', ', 0,5)').replace('rgb', 'rgba')),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,  // Se ajusta al tamaño del contenedor
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  graph1(){
    this.chart1 = new Chart('canvas1', {
      type: 'bar',
      data: {
        labels: this.names,
        datasets: [
          {
            label: '',
            data: this.datas1,
            backgroundColor: this.randomColors,
            borderColor: this.randomColors.map((c: string) => c.replace(')', ', 1)').replace('rgb', 'rgba')),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,  // Se ajusta al tamaño del contenedor
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  graph2(){
    this.chart2 = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: this.names,
        datasets: [
          {
            label: '',
            data: this.datas2,
            backgroundColor: this.randomColors,
            borderColor: this.randomColors.map((c: string) => c.replace(')', ', 1)').replace('rgb', 'rgba')),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,  // Se ajusta al tamaño del contenedor
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
