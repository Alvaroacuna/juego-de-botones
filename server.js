const express = require("express");
const session = require('express-session');

const app = express();
const port = 8000;
let contador = 0;

app.use(session({secret: 'holasoytuclave'})); 


app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/static', express.static("static"));

app.use(require('./routes/routes'));

const server = app.listen(port, function() {
    console.log('Escuchando en el puerto ' + port);
});

const io = require('socket.io')(server);

io.on('connection', function(socket){

    socket.emit('vecesClickeado',{
        botonClicks: `Este botón ha sido clickeado ${contador} veces`

    });
    socket.broadcast.emit('vecesClickeado', {
        botonClicks: `Este botón ha sido clickeado ${contador} veces`
    });

    socket.on('botonclickeado', function(){
        contador += 1;
        socket.emit('vecesClickeado', {
            botonClicks: `Este botón ha sido clickeado ${contador} veces`
        })
        socket.broadcast.emit('vecesClickeado', {
            botonClicks: `Este botón ha sido clickeado ${contador} veces`
        });
        
    })
    
    socket.on('botonreset', function() {
        contador = 0;
        socket.emit('resetear', {
            botonClicks: `Este botón ha sido clickeado ${contador} veces`
        })
        socket.broadcast.emit('resetear', {
            botonClicks: `Este botón ha sido clickeado ${contador} veces`
        });

    })

})




