const express = require('express');
const producto = require('./productos');
var hbs = require('hbs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
const routerApp=express.Router();
const PORT=8080;

routerApp.get('/productos', (req, res) => {
    res.send(producto.productosListados)
})

routerApp.get('/', (req, res) => {
    res.send('index')
})

routerApp.get('/productos/vista', (req, res) => {
    let arrayProductos = producto.productosListados;
    if(arrayProductos.error){
        res.render('error',{error:arrayProductos.error})
    }else{
        res.render('productos',{productos:arrayProductos})
    }
    
})


routerApp.get('/productos/:id', (req, res) => {
    let idProducto = req.params.id;    
    res.send(producto.filtrarPorId(idProducto))
})

routerApp.post('/productos/guardar', (req, res) => {
    let productoAGuardar = req.body;           
    producto.nuevoProducto(productoAGuardar);        
    res.redirect('/api');
})

routerApp.put('/productos/actualizar/:id', (req, res) => {
    let productoAActualizar = req.body;   
    let idProductoAActualizar = req.params.id;
    let productoActualizado = producto.actualizarPorId(idProductoAActualizar,productoAActualizar);
    res.send(productoActualizado);
})

routerApp.delete('/productos/borrar/:id', (req, res) => {
    let idProductoABorrar = req.params.id;   
    let productoBorrado = producto.borrarPorId(idProductoABorrar);
    res.send(productoBorrado);
})

app.use('/api',routerApp)

app.listen(PORT, () => {
    console.log(`El servidor se creó correctamente en el puerto: ${PORT}`)
})