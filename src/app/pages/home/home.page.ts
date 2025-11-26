import { Component } from '@angular/core';
import { Router } from '@angular/router';

// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { CurrentSessionObject } from '../../services/session/session.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  constructor(private router: Router) {// , private screenOrientation: ScreenOrientation
    if (!CurrentSessionObject.Logued){
      // this.router.navigate(['login']);
    }else{
    }
    
    //TODO
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  logout(){
    CurrentSessionObject.logout();
    this.router.navigate(['']);
  }
}
