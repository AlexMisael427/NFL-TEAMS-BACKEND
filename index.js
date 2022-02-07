const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');

const app = express();

///cors
app.use(cors());

///Lectura del body
app.use(express.json());


//Conexion a base de datos
dbConnection();

app.use('/api/teams',require('./routes/teams.route'))
app.use('/api/games',require('./routes/games.route'))


app.listen(3000, ()=>{
    console.log('Puerto del servidor 3000');
});