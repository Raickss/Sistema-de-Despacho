import { Injectable } from '@angular/core';
import { Test } from './test';
@Injectable({
  providedIn: 'root'
})
export class FifoService {
  data: any;
  aux: any;
  datas: any = [];
  timeLine: number = 0;
  constructor() { }
  fifo(tests: Test[]): any{
    while (tests.length){
      this.data = tests.shift();
      if(this.timeLine == 0){
        this.timeLine = this.data.tiempo;
      }
      this.aux = {y:this.data.task, x:[this.timeLine, this.data.cpu + this.timeLine]};
      this.datas.push(this.aux)
      this.timeLine = this.timeLine + this.data.cpu;
    }
    return this.datas;
  }
}
