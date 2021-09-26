export class Producto{
  constructor(
    public _id: String,
    public productoEmpresa: String,
    public nombre: String,
    public proveedor: String,
    public precio: Number,
    public stock: Number,
    public cantidadVendida: Number,
    public imagen: String
  ){}
}

