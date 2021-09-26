import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicioadmin',
  templateUrl: './inicioadmin.component.html',
  styleUrls: ['./inicioadmin.component.scss'],
  providers: [EmpresaService]
})
export class InicioadminComponent implements OnInit {
  public empresasList;
  public empresaIDModel: Empresa;
  public empresaActualizada;
  constructor(private _empresaService: EmpresaService) {
    this.empresaIDModel = new Empresa("","","","","");
   }

  ngOnInit(): void {
    this.obtenerEmpresas();
  }

  agregarEmpresas(){
    this._empresaService.agregarEmpresa(this.empresaIDModel).subscribe(
      response=>{
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Empresa creada correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.obtenerEmpresas();
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    )
  }

  editarEmpresa(id){
    this._empresaService.editarEmpresa(this.empresaIDModel, id).subscribe(
      response=>{
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Empresa editada correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.obtenerEmpresas();
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    )
  }

  eliminarEmpresa(id){
    this._empresaService.eliminarEmpresa(id).subscribe(
      response=>{
        console.log(response.empresaEliminada);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Empresa eliminada correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.obtenerEmpresas();
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    )
  }

  obtenerEmpresas(){
    this._empresaService.obtenerEmpresas().subscribe(
      response=>{
        console.log(response.empresas);
        this.empresasList = response.empresas;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  obtenerEmpresaId(id){
    this._empresaService.obtenerEmpresaId(id).subscribe(
      response=>{
        this.empresaIDModel = response.empresaEncontrada;
      this.empresaActualizada = response.empresaEncontrada;
      console.log(response.empresaEncontrada);
      }
    )
  }

}
