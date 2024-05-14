import { Component, Input, OnInit } from '@angular/core';
import Chart, { plugins, scales } from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit{
  public chart: any;


  @Input()
  graphData:[string[], string[]] = [[],[]];

  ngOnInit():void
  {
    this.createChart();
  }


  createChart(){
  
    let chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.graphData[1], 
	       datasets: [
          {
            label: "Weight",
            data: this.graphData[0],
            fill: 'origin',
            tension: .5
          } 
        ]
      },
      options: {
        plugins:
        {
          legend:
          {
            display:false
          }
        },
        scales:
        {
          x: {grid: {display:false}},
          y: {grid: {display:false}}
        }
      }
    });

    const ctx = chart.ctx;
    const height = chart.height;
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(1, "#ff541200");
    gradient.addColorStop(0, "#ff541290");
    chart.data.datasets[0].backgroundColor = gradient;
    chart.data.datasets[0].borderColor = "#ff5412";
    chart.options.responsive = true;
    chart.options.maintainAspectRatio = true;
    chart.options.aspectRatio = 1.5;
    this.chart = chart;
  }

}
