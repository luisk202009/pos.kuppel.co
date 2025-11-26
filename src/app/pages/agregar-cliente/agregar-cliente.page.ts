import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators,FormGroup,FormBuilder } from '@angular/forms';
import { CurrentSessionObject } from '../../services/session/session.service';
import { environment } from './../../../environments/environment';
import { Terceros } from 'src/app/services/terceros/terceros.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.page.html',
  styleUrls: ['./agregar-cliente.page.scss'],
})
export class AgregarClientePage {
  public valido:boolean;
  public gform:FormGroup;


  constructor(private router: Router, private formBuilder:FormBuilder) {
    // if (!CurrentSessionObject.Logued){
    //   this.router.navigate(['login']);
    // }
    this.form();
  }

  form(){
    this.gform=this.formBuilder.group({
      nombre:['',[Validators.required]],
      correo:['',[Validators.required,Validators.email]],
      apellido:['',[Validators.required]],
      telefono:['',[Validators.required,Validators.maxLength(10)]],
      identificacion:['',[Validators.required]],
      direccion:['',[Validators.required]],
      razon_social:'',
      es_cliente: true,
      es_provedor: false,
      cliente: {
        sexo: "0",
        fecha_nacimiento: new Date() 
      }

    });
    
  }

  limpiar(){
    this.gform.reset();
  }

  guardar(){
    
    if(this.gform.valid){
      const cliente=this.gform.value;
      CurrentSessionObject.post(environment.api.app + '/terceros', cliente)
      .then(
        (response)=>{
          this.limpiar();
        }
      )
      Terceros.add(cliente);
    }
  }


}
