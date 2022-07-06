const express = require('express')
const app = express()
const { Router } = require('express')
const ClaseProductos = require("./Productos");

const routerProductos = Router()
routerProductos.use(express.json())

const productos = new ClaseProductos([])

routerProductos.get('/', (req, res) => {
    console.log(productos.productos)
    res.send(productos.productos)
})

routerProductos.get('/:id', (req, res) => {
    const { id } = req.params
    const product = productos.productos.find( object => object.id === parseInt(id))
    if(product==undefined){
        res.send({ error : 'producto no encontrado' })
    }
    res.send(productos.productos.find( object => object.id === parseInt(id)))
})

routerProductos.post('/', (req, res) => {
    let id
    if(productos.productos.length>0){
        id = productos.productos.at(-1).id + 1 
    }else{
        id = 1
    }   
    const producto = { id: id, ...req.body}
    productos.productos.push(producto)
    res.send(producto)
})

routerProductos.put('/:id', (req, res) => {
    const { id } = req.params
    const index = productos.productos.findIndex( object => object.id === parseInt(id))
    if(index===-1){
        res.send({ error : 'producto no encontrado' })
    }else{
        productos.productos[index].title = req.body.title
        productos.productos[index].price = req.body.price
        productos.productos[index].thumbnail = req.body.thumbnail
        res.send('Se actualizo el producto con id: '+id)
    }    
})

routerProductos.delete('/:id', (req, res) => {
    const { id } = req.params
    const index = productos.productos.findIndex( object => object.id === parseInt(id))
    if(index===-1){
        res.send({ error : 'producto no encontrado' })
    }else{
        productos.productos.splice(index, 1)
        res.send('Se elimino el producto con id: '+id)
    }
    
})

app.use('/api/productos', routerProductos)
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))