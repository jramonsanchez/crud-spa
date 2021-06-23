const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

//Mysql 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crudBD'
});

//Route

//GET Obtener todos los registros
app.get('/api/all', (req, res)=> {
    const sql = 'SELECT * FROM animales';
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if(result.length > 0){
            res.json(result);
        }else{
            res.send('No tenemos Animales');
        }
    });
});

//GET Obtener un registro (Param: id)
app.get('/api/all/:id', (req, res)=> {
    const {id} = req.params;
    const sql = `SELECT * FROM animales WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if(result.length > 0){
            res.json(result);
        }else{
            res.send('Empleado no encontrado');
        }
    });
});

//POST Crear un registro
app.post('/api/add', (req, res)=> {
    const sql = 'INSERT into animales SET ?';
    const animal = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }
    connection.query(sql, animal, error => {
        if (error) throw error;
        const sql = 'SELECT MAX(id) AS id FROM animales'
        connection.query(sql, (error, result) => {
            if (error) throw error;
            if(result.length > 0){
                res.status(200).json(result);
            }else{
                res.status(200).send('No tenemos Animales');
            }
        });
        // res.status(200).json(animal);
    });
});

//PUT Modificar un registro (Param: id , Body {})
app.put('/api/update/:id', (req, res)=> {
    const {id} = req.params;
    const {nombre, descripcion} = req.body;
    const sql = `UPDATE animales SET nombre = '${nombre}', descripcion = '${descripcion}' WHERE id = ${id}`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Registro de Animal Actualizado');
    });
});

//DELETE Eliminar un registro (Param:  id)
app.delete('/api/delete/:id', (req, res)=> {
    const {id} = req.params;
    const sql = `DELETE FROM animales WHERE id = ${id}`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Animal Eliminado');
    });
});

// Check connect 
connection.connect(error => {
    if (error) throw error;
    console.log('Database serve running');
});
//PUERTO
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));