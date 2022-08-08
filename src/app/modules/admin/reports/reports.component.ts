import { Component, OnInit } from '@angular/core';
import {ReportsService} from './services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    reportsPerDay: any;
    foods = [
        {value: 'day', viewValue: 'Day'},
        {value: 'month', viewValue: 'Month'},
        {value: 'year', viewValue: 'Year'},
    ];
    data: any;
    selectedFilter: string;
  constructor(private reportsService: ReportsService) {
      this.data = null;
  }

  ngOnInit(): void {
      this.reportsService.getAllReports().subscribe((response: any) => {
          let data = response;
          data = data.map((report: any) => {
              const newReport = {...report};
              newReport.date = report.date.substring(0,10);
              return newReport;
          });
          this.reportsPerDay = data;
      });
  }

    // @ts-ignore
    selectFilterValue(): void {
        const range = {
            day: 2,
            month: 1,
            year: 0
        };
        const newData = new Object({});
        this.reportsPerDay.forEach( (data: any) => {
            // @ts-ignore
            const str = data.date.trim().split('-');
            const t = str[range[this.selectedFilter]];
            if(!newData[t]) {newData[t] = []; }
            newData[t].push(data);
        });
        this.data = Object.entries(newData);
    }
}
