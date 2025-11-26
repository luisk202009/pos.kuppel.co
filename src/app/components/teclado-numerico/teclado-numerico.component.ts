import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teclado-numerico',
  templateUrl: './teclado-numerico.component.html',
  styleUrls: ['./teclado-numerico.component.scss'],
})
export class TecladoNumericoComponent implements OnInit {
  
  public num1:string;
  public cont:number;
  constructor() { 
    this.cont=0;
    this.num1='';
  }

  ngOnInit() {}

  printNumber(numero){
   
    this.num1+=numero;
    console.log(this.num1,"num1");

   
  }

  printSigno(){

    this.cont++
    if(this.cont==1){
      console.log("+");
   
    }else{
      console.log("-");
      this.cont=0;
    }

  }

  borrar(){

    
    this.num1=this.num1.slice(0,this.num1.length-1);
    console.log(this.num1);
  }

  

}
