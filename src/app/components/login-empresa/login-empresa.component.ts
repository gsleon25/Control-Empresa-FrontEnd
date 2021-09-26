import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-empresa',
  templateUrl: './login-empresa.component.html',
  styleUrls: ['./login-empresa.component.scss'],
  providers: [EmpresaService]
})
export class LoginEmpresaComponent implements OnInit {
  public empresaModel: Empresa;
  public token;
  public identidad;
  constructor(private _empresaService: EmpresaService, private _router: Router) {
    this.empresaModel = new Empresa("","","","","");
  }

  ngOnInit(): void {
  }

  obtenerToken(){
    this._empresaService.loginEmpresa(this.empresaModel, 'true').subscribe(
      response=>{
  //    console.log(response.token);
        this.token = response.token;
        localStorage.setItem('token', this.token)
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  loginEmpresa(){
    this._empresaService.loginEmpresa(this.empresaModel).subscribe(
      response=>{
//      console.log(response);
        this.identidad = response.empresaEncontrada;
        localStorage.setItem('identidad', JSON.stringify(this.identidad));
        this.obtenerToken();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sesion iniciada correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this._router.navigate(['inicioEmpresa'])
      },
      error=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

}
