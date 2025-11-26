import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { environment } from '../../../environments/environment';

@Injectable({
 providedIn: 'root'
})

/**
 * Servicio de manejo de sesiones
 * Provee una constante de sesión que permite realizar solicitudes validadas a la API,
 * iniciar y cerrar sesión
 * Provee los metodos POST, GET, PUT y DELETE además del método login que permite iniciar sesión
 */

class SessionService {
  private AccessToken: string;
  public Bussinesses: Array<any>;
  public BussinessID: string;

  public Cajas: Array<any>;
  public CajaID: string;

  public Account: any;
  public Logued: boolean;
  public User: any;

  public ErrorOnLogin: number;
  public ErrorMessage: string;
  public ErrorCode: number;

  private publicPaths: any[] = [environment.api.account + '/login', environment.api.account + '/business', environment.api.root + '/logout'];

  constructor(private toastController: ToastController){
    this.AccessToken = localStorage.getItem("AccessToken");
    this.BussinessID = localStorage.getItem("BussinessID");
    this.Bussinesses = JSON.parse(localStorage.getItem("Bussinesses"));
    this.CajaID = localStorage.getItem("CajaID");
    this.Cajas = JSON.parse(localStorage.getItem("Cajas"));
    this.User = JSON.parse(localStorage.getItem("User"));
    this.Account = JSON.parse(localStorage.getItem("Account"));

    if (this.AccessToken === null) this.Logued = false;
    else this.Logued = true;
    this.ErrorOnLogin = ERROR_SESSION.NO_ERROR;
    this.ErrorMessage = '';
  }

  private async validateRequest(url: string){
    if ((localStorage.getItem('AccessToken') === null || localStorage.getItem('BussinessID') === null || localStorage.getItem('Account') === null) && this.publicPaths.indexOf(url) === -1){
      const toast = await this.toastController.create({
        position: 'top',
        color: 'danger',
        header: 'Error de Sesión',
        message: 'Debe iniciar sesión para usar la plataforma',
        duration: 2000
      });
      toast.present();

      //location.href = "/login";
      return false;
    }else{
      return true
    }
  }

  setToken(token: string){
    this.AccessToken = token;
  }

  resetErrors(){
    this.ErrorOnLogin = ERROR_SESSION.NO_ERROR;
    this.ErrorCode = -1;
    this.ErrorMessage = '';
  }
  // TODO: Funciones que permiten hacer solicitudes al API
  async login(username: string, pass: string){
    await this.logout();
    // logueamos el usuario
    await fetch(environment.api.account + '/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: username, password: pass})
    }).then(response => response.json().then(json => {
      if (json.message !== undefined) {
        this.ErrorOnLogin = ERROR_SESSION.USERNAME_OR_PASSWORD;
        this.ErrorMessage = json.message;
        this.ErrorCode = json.code;
        return;
      }

      this.AccessToken = json.token;
      this.User = json.user;

      localStorage.setItem('AccessToken', this.AccessToken);
      localStorage.setItem('User', JSON.stringify(this.User));

    }), () => this.ErrorOnLogin = ERROR_SESSION.USERNAME_OR_PASSWORD);
    if (this.ErrorOnLogin !== ERROR_SESSION.NO_ERROR) { return; }
    // Traemos las empresas para loguear la empresa
    await fetch(environment.api.account + '/business', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Access-Token': localStorage.getItem('AccessToken'),
        'Content-Type': 'application/json',
      }
    }).then(response => response.json().then(json => {
      if (json.message !== undefined) {
        this.ErrorOnLogin = ERROR_SESSION.BUSSINESSES;
        this.ErrorMessage = json.message;
        this.ErrorCode = json.code;
        return;
      }

      this.Bussinesses = json;
      localStorage.setItem("Bussinesses", JSON.stringify(json))
      return true;
    }), () => this.ErrorOnLogin = ERROR_SESSION.BUSSINESSES);
  }
  async loginCaja(){
    // Traemos los datos de cuenta y cargamos las cajas llamada desde la page login
    this.publicPaths.push(environment.api.app + '/usuarios/cuenta/' + this.User._id);
    await this.get(environment.api.app + '/usuarios/cuenta/' + this.User._id, {}).then(
      (json) => {
        if (json.message !== undefined) {
          this.ErrorOnLogin = ERROR_SESSION.CAJAS;
          this.ErrorMessage = json.message;
          this.ErrorCode = json.code;
          return;
        }

        this.Account = json;
        this.Cajas = json.cajas;

        localStorage.setItem('Account', JSON.stringify(json));
        localStorage.setItem('Cajas', JSON.stringify(json.cajas));
      }
    );
  }

  logout(){
    this.post(environment.api.root + '/logout', {});
    this.Logued = false;
    this.AccessToken = '';
    this.BussinessID = '';
    this.CajaID = '';
    this.Cajas = [];
    this.Account = {};
    this.Bussinesses = [];
    this.User = {};
    this.resetErrors();
    localStorage.setItem("logued", "false"); // En realidad no importa :)
    localStorage.clear();
  }

  setBussiness(id: string){
    this.Logued = true;
    this.BussinessID = id;
    localStorage.setItem('BussinessID', this.BussinessID);
  }

  async post(url: string, body: any){
    if (!this.validateRequest(url)) return;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Access-Token': localStorage.getItem('AccessToken'),
        'Content-Type': 'application/json',
        'Empresa-Id': localStorage.getItem('BussinessID')
      },
      body: JSON.stringify(body)
    });
    return await response.json();
  }
  async put(url: string, body: any){
    if (!this.validateRequest(url)) return;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Access-Token': localStorage.getItem('AccessToken'),
        'Content-Type': 'application/json',
        'Empresa-Id': localStorage.getItem('BussinessID')
      },
      body: JSON.stringify(body)
    });
    return await response.json();
  }
  async get(url: string, params: object = {}){
    if (!this.validateRequest(url)) return;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Access-Token': localStorage.getItem('AccessToken'),
        'Empresa-Id': localStorage.getItem('BussinessID')
      }
    });
    return await response.json();
  }
  async delete(url: string, params: object){
    if (!this.validateRequest(url)) return;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Access-Token': localStorage.getItem('AccessToken'),
        'Empresa-Id': localStorage.getItem('BussinessID')
      }
    });
    return await response.json();
  }
}

export const ERROR_SESSION: any = {  NO_ERROR: 0,  USERNAME_OR_PASSWORD: 1,  BUSSINESSES: 2,  CAJAS: 3};
export const CurrentSessionObject: SessionService = new SessionService(new ToastController());
