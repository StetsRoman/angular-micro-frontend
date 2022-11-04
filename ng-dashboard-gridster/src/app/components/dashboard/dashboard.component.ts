import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { LayoutService, IComponent } from '../../services/layout.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  gridColNum: number;

  highcharts = Highcharts;
  highChart: Highcharts.Chart | null;
  chartOptions: any = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Stacked bar chart',
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total fruit consumption',
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: 'normal',
      },
    },
    series: [
      {
        name: 'John',
        data: [5, 3, 4, 7, 2],
      },
      {
        name: 'Jane',
        data: [2, 2, 3, 2, 1],
      },
      {
        name: 'Joe',
        data: [3, 4, 4, 2, 5],
      },
    ],
  };

  constructor(public layoutService: LayoutService) {    
    layoutService.setupOptions({
      ...layoutService.options,
      itemResizeCallback: (item, itemComponent) => {
        const chartsToResize = this.highcharts.charts.filter((x) =>
          x && x.container ? itemComponent.el.contains(x.container) : false
        );
        this.resizeCharts(chartsToResize);
      },
      gridSizeChangedCallback: (gridster)=>{
        setTimeout(()=> this.resizeCharts(this.highcharts.charts), 100);
      }      
    });
    this.gridColNum = layoutService.options.maxCols;
  }

  ngOnInit() {
    this.resizeCharts(this.highcharts.charts);
  }

  resizeCharts(charts: Highcharts.Chart[]): void {
    for (let chart of charts) {
      if (chart) {
        chart.reflow();
      }
    }
  }

  get components(): IComponent[] {
    return this.layoutService.components;
  }

  get layout(): GridsterItem[] {
    return this.layoutService.layout;
  }

  get options(): GridsterConfig {
    return this.layoutService.options;
  }
}
