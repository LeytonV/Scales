import { AfterViewInit, Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset } from 'chart.js';

@Component({
  selector: 'app-linechart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.css'
})
export class LinechartComponent implements AfterViewInit
{
  
  @ViewChild('graph') graph: ElementRef;
  @ViewChild('chart') chart: BaseChartDirective;
  @ViewChild('container') container: ElementRef;
  
  aspectRatio:number = 2;

  @Input()
  chartWeights:number[] = [];
  @Input()
  chartDates:string[] = []

  @Input()
  currentDate:string = "";

  colorString:string = "#FF5412";
  
  fillTopString:string = "#FF5412";
  fillBottomString:string = "#FF541200";

  public chartData = 
  [
    {
      data: [1],
      label: 'Weight',
      borderColor: this.colorString,
      backgroundColor: this.colorString,
      fill: 'origin',
      radius: [10],
      hoverRadius: [10]
    }
  ]

  chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: this.aspectRatio
  };

  ngOnChanges(changes: SimpleChanges): void
  {
    let radiusInfo = this.pointRadiuses;
    this.chartData[0].data = this.chartWeights;
    this.chartData[0].radius = radiusInfo[0];
    this.chartData[0].hoverRadius = radiusInfo[1];
  }

  ngAfterViewInit(): void
  {
    this.chartData = [{...this.chartData[0], backgroundColor: this.createGradient()}];
  }

  get pointRadiuses():[number[], number[]]
  {
    let defaultPointRadius:number = 5;
    let activePointRadius:number = 10;
    let hoverPointRadiusModifier:number = 4;

    let radiuses:number[] = [];
    let hoverRadiuses:number[] = [];
    this.chartDates.forEach((element) =>
    {
      let radius = element == this.currentDate ? activePointRadius : defaultPointRadius;
      radiuses.push(radius);
      hoverRadiuses.push(radius + hoverPointRadiusModifier);
    })

    return [radiuses, hoverRadiuses];
  }

  createGradient()
  {
    const ctx = this.graph.nativeElement.getContext('2d');
    const gradientStroke = ctx.createLinearGradient(0,this.container.nativeElement.offsetHeight - 30,0,0);
    gradientStroke.addColorStop(0, this.fillBottomString);
    gradientStroke.addColorStop(1, this.fillTopString);
    return gradientStroke;
  }

}
