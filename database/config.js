const mongoose = require('mongoose');

const dbConnection = async () => 
    {
        try {
            await mongoose.connect('mongodb+srv://alexmisael427:Misael12@pruebas.d7a3n.mongodb.net/NFL',{ 
                useNewUrlParser: true, 
                useUnifiedTopology: true}
                );
            console.log('Conectado a la base de datos correctamente');
        } catch (error) 
        {
            console.error(error);
            throw new Error('No pudo conectarse a la base de datos');
        }
    };

    module.exports = 
    {
        dbConnection
    }