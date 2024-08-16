import express from "express";
require ('dotenv').config();

const app = express();
const port = process.env.PORT

app.get('/', (req,res) => {s

    res.send('hola Mundo El Servidor Esta Escuchando en el Puerto 3000')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
























































































