import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CurrentSessionObject } from '../../services/session/session.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.page.html',
  styleUrls: ['./init.page.scss'],
})
export class InitPage implements OnInit{

  constructor(private router: Router) { this.redirect(); }
  ionViewDidEnter(): void{ this.redirect(); }
  ngOnInit(): void{ this.redirect(); }

  redirect(){
    if (!CurrentSessionObject.Logued){
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['venta']);
    }
  }
}
