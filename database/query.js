const ProductQuery = {
    
    addUser: 'INSERT INTO loguin (nombre,usuario,pass) VALUES (@nombre,@usuario,@pass)',
    /* addProducto: 'INSERT INTO productoAlmacen (nomProducto,categoriaProducto,descripcion,valorUnitario,refProducto,marca,modelo) VALUES (@nomProducto,@categoriaProducto,@descripcion,@valorUnitario,@refProducto,@marca,@modelo)',
    updateProducto: 'UPDATE productoAlmacen SET  nomProducto=@nomProducto,categoriaProducto=@categoriaProducto,descripcion=@descripcion,valorUnitario=@valorUnitario, marca=@marca,modelo=@modelo WHERE refProducto = @refProducto', */
    findByUser: 'Select * from loguin where usuario = @usuario'
   
}

module.exports={
    ProductQuery};