import express from 'express';
import handlebars from 'express-handlebars';
// IMPORTAR __DIRNAME
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';



const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar handlebars para leer el contenido de los endpoints

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views') // TODO
app.set('view engine', 'handlebars')

app.use('/', viewsRouter);

// Utilizar recursos estaticos
app.use(express.static(__dirname + '/public'));

// Utilizar el router

// app.listen(PORT, () => {
//     console.log('Server is running on port', PORT);
// });
const httpServer = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Instanciar el servidor
const socketServer = new Server(httpServer);

let messages = [];

// Escuchar eventos de conexion
socketServer.on('connection', socket => {
    console.log('Nueva Conexión:', socket.id);

    socket.on('message', data => {
        messages.push(data);
        socket.emit('messageLogs', messages);
        console.log(data);
        //socketServer.emit('message', data);
    });
})


