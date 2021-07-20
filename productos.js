class Producto{
    productos = [];
    idProducto = 0;
    
    nuevoProducto(producto){ 
        let productoCreado = {
            titulo: producto.title,
            precio: parseInt(producto.price),
            urlFoto: producto.thumbnail,
            id: ++this.idProducto
        }    
        this.productos.push(productoCreado);
        return productoCreado;
    }

    get productosListados(){
        if (this.productos.length==0){
            return {error:"No existen productos"}
        }
        return this.productos;
    }

    filtrarPorId(id){
        let idParsed = parseInt(id);        
        let objetoFiltrado = this.productos.find((obj)=>{
            return obj.id==idParsed;
        })        
        if (objetoFiltrado==undefined){
            return {error:"No existe el producto que buscas"}
        }
        return objetoFiltrado;
    }

    actualizarPorId(id, productoActualizado){ 
        let idParsed = parseInt(id);   
        let productoAModificar = this.productos.find((obj)=>{
            return obj.id==idParsed;
        });
        if (productoAModificar==undefined){
            return {error:"No existe el producto que quieres actualizar"}
        }else{
            productoAModificar.titulo=productoActualizado.title;
            productoAModificar.precio=productoActualizado.price;
            productoAModificar.urlFoto=productoActualizado.thumbnail;
            return productoAModificar;
        }
    }

    borrarPorId(id){
        let idParsed = parseInt(id);
        let productoABorrar = this.productos.find((obj,idx)=>{
            if(obj.id==idParsed){
                this.productos.splice(idx,1);
                return obj;
            };
        })
        
        if (productoABorrar==[]){
            return {error:"No existe el producto que quieres borrar"}
        }
            return productoABorrar;        
    }  
}

module.exports = new Producto;