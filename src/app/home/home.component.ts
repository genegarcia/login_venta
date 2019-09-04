import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { UserService } from '../services/authentication.service';
import { HistoryVentasService } from '../services/history_ventas.service';
import { VentasInterface } from '../models/models-history-ventas';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { isNullOrUndefined } from 'util';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers:[ HistoryVentasService ]
})
export class HomeComponent implements OnInit {

  ventas: Array<VentasInterface>
  isLogged = false;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: '#343a40',
      borderColor: '#343a40',
      pointBackgroundColor: '#6C757A',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#6C757A'
    },
    { // dark grey
      backgroundColor: '#6c757d',
      borderColor: '#6c757d',
      pointBackgroundColor: '#6c757d',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#6c757d'
    },
    { // red
      backgroundColor: '#6c757d',
      borderColor: '#6c757d',
      pointBackgroundColor: '#6c757d',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#6c757d'
    }
  ];
  public lineChartColors1: Color[] = [
    { // grey
      backgroundColor: '#fd7e14',
      borderColor: '#fd7e14',
      pointBackgroundColor: '#6C757A',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#6C757A'
    },
    { // dark grey
      backgroundColor: '#ffc107',
      borderColor: '#ffc107',
      pointBackgroundColor: '#6C757A',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#6C757A'
    },
    { // red
      backgroundColor: '#ffc107',
      borderColor: '#ffc107',
      pointBackgroundColor: '#ffc107',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#ffc107'
    }
  ];

  public barChartData: ChartDataSets[] = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Cantidad Vendida' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Monto Facturado' }
  ];
  constructor(
    private route: Router,
    private userService: UserService,
    private ventasService:HistoryVentasService,
  ){}
    
  ngOnInit(){
    this.checkUser()


    if(!this.isLogged) {
      this.route.navigate(['/login']);
    } else {
        this.getAllVentas();
    }
  }

  checkUser() {
    if(this.userService.getCurrentUser() === null) {
        this.isLogged = false;
    } else {
        this.isLogged = true;
    }
  }
  getAllVentas() {
    this.ventasService.getAllVentas()
        .subscribe(
            result => {
                console.log(this.ventas = result.ventas);
            },
            error => {
                alert("An error ocurred " + error);
            }
        );
}

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  offLogin(){
    return( this.userService
      .logout(),
      this.route.navigate(['/']));
  }
  
}
