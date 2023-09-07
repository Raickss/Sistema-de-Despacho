import { Injectable } from '@angular/core';
import { Test } from './test';
import { SvjService } from './svj.service';
import { PriorityService } from './priority.service';

@Injectable({
  providedIn: 'root'
})
export class CalculateTimeService {

  constructor(private svjService: SvjService, private priorityService: PriorityService) { }
  fifoCal(tests: Test[]): any{
    var timeLine: number = 0;
    var data: any;
    var auxTiempoE: any;
    var auxTiempoS: any;
    var tiempos: any[] = [];
    while (tests.length){
      data = tests.shift();
      if(timeLine == 0){
        timeLine = data.tiempo;
      }
      auxTiempoE = timeLine - data.tiempo;
      timeLine = timeLine + data.cpu;
      auxTiempoS = timeLine - data.tiempo;
      tiempos.push({task: data.task, te: auxTiempoE, ts:auxTiempoS})
    }
    return tiempos;
  }
  svjCal(tests: Test[]): any{
    var timeLine: number = 0;
    var data: any;
    var auxTiempoE: any;
    var auxTiempoS: any;
    var tiempos: any[] = [];
    while (tests.length){
      tests = this.svjService.sort(tests, timeLine);
      data = tests.shift();
      auxTiempoE = timeLine - data.tiempo;
      timeLine = timeLine + data.cpu;
      auxTiempoS = timeLine - data.tiempo;
      tiempos.push({task: data.task, te: auxTiempoE, ts:auxTiempoS})
    }
    return tiempos;
  }
  prioCal(tests: Test[]): any{
    var timeLine: number = 0;
    var data: any;
    var auxTiempoE: any;
    var auxTiempoS: any;
    var tiempos: any[] = [];
    while (tests.length){
      tests = this.priorityService.sort(tests, timeLine);
      data = tests.shift();
      auxTiempoE = timeLine - data.tiempo;
      timeLine = timeLine + data.cpu;
      auxTiempoS = timeLine - data.tiempo;
      tiempos.push({task: data.task, te: auxTiempoE, ts:auxTiempoS})
    }
    return tiempos;
  }
}
