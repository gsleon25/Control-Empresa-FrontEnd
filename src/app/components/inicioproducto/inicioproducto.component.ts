import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicioproducto',
  templateUrl: './inicioproducto.component.html',
  styleUrls: ['./inicioproducto.component.scss'],
  providers: [ProductoService]
})
export class InicioproductoComponent implements OnInit {
  public productosList;
  public productoIDModel: Producto;
  public productoActualizado;
  constructor(private _productoService: ProductoService) {
    this.productoIDModel = new Producto("","","","",0,0,0,"");
   }

  ngOnInit(): void {
    this.listarProductosPorEmpresa();
  }

  agregarProducto(){
    this._productoService.agregarProducto(this.productoIDModel).subscribe(
      response=>{
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto creado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.listarProductosPorEmpresa();
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

  editarProducto(id){
    this._productoService.editarProducto(this.productoIDModel, id).subscribe(
      response=>{
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto editado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.listarProductosPorEmpresa();
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

  eliminarProducto(id){
    this._productoService.eliminarProducto(id).subscribe(
      response=>{
        console.log(response.productoEliminado);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto eliminado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.listarProductosPorEmpresa();
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

  listarProductosPorEmpresa(){
    this._productoService.listarProductosPorEmpresa().subscribe(
      response=>{
        console.log(response.productosXEmpresa);
        this.productosList = response.productosXEmpresa;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  obtenerProductoId(id){
    this._productoService.obtenerProductoId(id).subscribe(
      response=>{
        this.productoIDModel = response.producEncontrado;
      this.productoActualizado = response.producEncontrado;
      console.log(response.producEncontrado);
      }
    )
  }

}
