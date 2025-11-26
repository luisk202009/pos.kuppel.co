import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CurrentSessionObject, ERROR_SESSION } from '../../services/session/session.service';
import { Router } from '@angular/router';

// Modal para elegir empresa
import { SelectBussinessPage } from './components/select-bussiness/select-bussiness.page';
import { SelectCajaPage } from './components/select-caja/select-caja.page';

import { CategoriasPortafolio } from '../../services/categorias-portafolio/categorias-portafolio.service';
import { ProductoServicio } from '../../services/producto-servicio/producto-servicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage{
  public username: string = '';
  public password: string = '';
  private onLogin: any[] = [];

  constructor(private Modals: ModalController, private router: Router, private toastController: ToastController) {
    
    this.onLogin.push(CategoriasPortafolio.refresh);
    this.onLogin.push(ProductoServicio.refresh);

    if (localStorage.getItem("logued") == "true"){
      CurrentSessionObject.setToken(localStorage.getItem("AccessToken"));
      CurrentSessionObject.BussinessID = localStorage.getItem("BussinessID");
      CurrentSessionObject.Bussinesses = JSON.parse(localStorage.getItem("Bussinesses"));
      CurrentSessionObject.CajaID = localStorage.getItem("CajaID");
      CurrentSessionObject.Cajas = JSON.parse(localStorage.getItem("Cajas"));
      CurrentSessionObject.User = JSON.parse(localStorage.getItem("User"));
      CurrentSessionObject.Account = JSON.parse(localStorage.getItem("Account"));
    }
  }

  dispatchOnLogin(){
    for (const i in this.onLogin) {
      if (typeof this.onLogin[i] === "function") this.onLogin[i]();
    }
  }

  setUsername = (username: string) => this.username = username;
  setPassword = (password: string) => this.password = password;

  async login(){
    await CurrentSessionObject.login(this.username, this.password);
    if (CurrentSessionObject.ErrorOnLogin === ERROR_SESSION.NO_ERROR){
      if (CurrentSessionObject.Bussinesses.length > 1){
        const modal = await this.Modals.create({
          component: SelectBussinessPage,
          cssClass: 'selectBussiness'
        });
        await modal.present();
        const { data } = await modal.onDidDismiss();
        if (data.id !== null){
          // Asignación de Id de la Empresa
          CurrentSessionObject.setBussiness(data.id);
          // Login Caja
          await CurrentSessionObject.loginCaja();
          if (CurrentSessionObject.Cajas.length > 1){
            const modalCaja = await this.Modals.create({
              component: SelectCajaPage,
              cssClass: 'selectCaja'
            });
            await modalCaja.present();
            const { data: dataCaja } = await modalCaja.onDidDismiss();
            if (dataCaja.id !== null){
              CurrentSessionObject.CajaID = dataCaja.id;
              localStorage.setItem('CajaID', dataCaja.id);
              const toast = await this.toastController.create({
                position: 'top',
                color: 'success',
                header: 'Bienvenid@ ' + CurrentSessionObject.User.nombres,
                message: 'Inicio de sesión exitoso',
                duration: 2000
              });
              toast.present();
            }else{
              CurrentSessionObject.CajaID = null;
              localStorage.setItem('CajaID', null);
              const toast = await this.toastController.create({
                position: 'top',
                color: 'warning',
                header: 'Acceso sin caja',
                message: 'Se ha permitido el acceso sin posibilidad de facturar',
                duration: 2000
              });
              toast.present();
              CurrentSessionObject.resetErrors();
            }
            // Success
            this.dispatchOnLogin();
            this.router.navigate(['']);
          }else if (CurrentSessionObject.Cajas.length > 0){
            CurrentSessionObject.CajaID = CurrentSessionObject.Cajas[0]._id;
            localStorage.setItem('CajaID', CurrentSessionObject.Cajas[0]._id);
            // Success -> Única Caja
            this.router.navigate(['']);
          }else{
            CurrentSessionObject.CajaID = null;
            localStorage.setItem('CajaID', null);
            const toast = await this.toastController.create({
              position: 'top',
              color: 'warning',
              header: 'Acceso sin caja',
              message: 'Se ha permitido el acceso sin posibilidad de facturar',
              duration: 2000
            });
            toast.present();
            CurrentSessionObject.resetErrors();
            // Success -> Sin Caja
            this.router.navigate(['']);
          }
        }else{
          const toast = await this.toastController.create({
            position: 'top',
            color: 'warning',
            header: 'Inicio de sesión cancelado',
            message: 'No hay empresa seleccionada',
            duration: 2000
          });
          toast.present();
          CurrentSessionObject.logout();
        }
      }else if (CurrentSessionObject.Bussinesses.length > 0){
        CurrentSessionObject.setBussiness(CurrentSessionObject.Bussinesses[0]._id);
        await CurrentSessionObject.loginCaja();
        if (CurrentSessionObject.Cajas.length > 1){
            const modalCaja = await this.Modals.create({
              component: SelectCajaPage,
              cssClass: 'selectCaja'
            });
            await modalCaja.present();
            const { data: dataCaja } = await modalCaja.onDidDismiss();
            if (dataCaja.id !== null){
              CurrentSessionObject.CajaID = dataCaja.id;
              localStorage.setItem('CajaID', dataCaja.id);
              const toast = await this.toastController.create({
                position: 'top',
                color: 'success',
                header: 'Bienvenid@ ' + CurrentSessionObject.User.nombres,
                message: 'Inicio de sesión exitoso',
                duration: 2000
              });
              toast.present();
            }else{
              CurrentSessionObject.CajaID = null;
              localStorage.setItem('CajaID', null);
              const toast = await this.toastController.create({
                position: 'top',
                color: 'warning',
                header: 'Acceso sin caja',
                message: 'Se ha permitido el acceso sin posibilidad de facturar',
                duration: 2000
              });
              toast.present();
              CurrentSessionObject.resetErrors();
            }
            // Success
            this.dispatchOnLogin();
            this.router.navigate(['']);
          }else if (CurrentSessionObject.Cajas.length > 0){
            CurrentSessionObject.CajaID = CurrentSessionObject.Cajas[0]._id;
            localStorage.setItem('CajaID', CurrentSessionObject.Cajas[0]._id);
            // Success -> Única Caja
            this.router.navigate(['']);
          }else{
            CurrentSessionObject.CajaID = null;
            localStorage.setItem('CajaID', null);
            const toast = await this.toastController.create({
              position: 'top',
              color: 'warning',
              header: 'Acceso sin caja',
              message: 'Se ha permitido el acceso sin posibilidad de facturar',
              duration: 2000
            });
            toast.present();
            CurrentSessionObject.resetErrors();
            // Success -> Sin Caja
            this.router.navigate(['']);
          }
      }else{
        const toast = await this.toastController.create({
          position: 'top',
          color: 'danger',
          header: 'Error de acceso - Código ' + CurrentSessionObject.ErrorCode,
          message: CurrentSessionObject.ErrorMessage,
          duration: 2000
        });
        toast.present();
      }
    }else{
      const toast = await this.toastController.create({
        position: 'top',
        color: 'danger',
        header: 'Error de acceso - Código ' + CurrentSessionObject.ErrorCode,
        message: CurrentSessionObject.ErrorMessage,
        duration: 2000
      });
      toast.present();
      CurrentSessionObject.resetErrors();
    }
  }
}
