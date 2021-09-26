import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss'],
  providers: [EmpresaService]
})
export class EmpresasComponent implements OnInit {
  public empresasList;
  constructor(private _empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.obtenerEmpresas();
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
        console.log(response);

      }
    )
  }

}
