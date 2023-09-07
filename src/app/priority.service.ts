import { Injectable } from '@angular/core';
import { Test } from './test';
@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  data: any;
  aux: any;
  datas: any = [];
  timeLine: number = 0;
  constructor() { }
  priority(tests: Test[]): any{
    while(tests.length){
      if (tests.length > 1){
        tests = this.sort(tests, this.timeLine);
      }
      this.data = tests.shift();
      this.aux = {y:this.data.task, x:[this.timeLine, this.data.cpu + this.timeLine]};
      this.datas.push(this.aux);
      this.timeLine = this.timeLine + this.data.cpu;
    }
    return this.datas;
  }
  sort(tests: Test[], upperLimit: number): Test[] {
    for (let i = 0; i < tests.length - 1; i++) {
      for (let j = i + 1; j < tests.length; j++) {
        if (tests[j].tiempo <= upperLimit) {
          if (tests[i].priority > tests[j].priority) {
            [tests[i], tests[j]] = [tests[j], tests[i]];
          }
        }
      }
    }
    return tests;
  }
  
}
