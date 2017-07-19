var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

let clientId = 1;
let usersConnected = [];
let usersReady = [];

let canUsersConnect = false;
let isGameCreated = false;
let gameStarted = false;
let currentIndex = -1;

app.use('/mobile-static', express.static(path.join(__dirname, 'mobile/build')))
app.use('/desktop-static', express.static(path.join(__dirname, 'desktop/build')) );
app.use('/host-static', express.static(path.join(__dirname, 'host/build')) );

app.get('/mobile', function(req, res){
  res.sendFile( __dirname + '/mobile/build/' + 'index.html');
});

app.get('/desktop', function(req, res){
  res.sendFile(__dirname + '/desktop/build/index.html');
})

app.get('/host', function(req, res){
  res.sendFile(__dirname + '/host/build/index.html');
})

io.on('connection', function(socket){
  if( socket.handshake.query.clinetType === "host" ){
    if ( gameStarted ) {
      socket.emit( "game started" );
      socket.emit( 'users changed', { usersConnected, usersReady } );
      socket.emit( "scene change", currentIndex );
    }
    return;
  }
  if ( canUsersConnect && usersConnected.length < 3 ) {
    const id = clientId++;
    usersConnected.push( id );
    socket.emit( 'assigned id', id );
    io.emit( 'users changed', { usersConnected, usersReady } );
    socket.on('throw dice', (data)=>{
      io.emit('throw dice', data);
    })
    socket.on('close throw info', (id)=>{
      io.emit('close throw info', id);
    })
    console.log( 'assigned id' );

    socket.on( 'disconnect', () => {
      usersConnected = usersConnected.filter( ( user ) => user !== id );
      usersReady = usersReady.filter( ( user ) => user.id !== id );
      io.emit( 'users changed', { usersConnected, usersReady } );
    } );

    socket.on( 'user done', ( data ) => {
      const newData = data;
      newData.id = id;
      usersReady.push( newData );
      io.emit( 'users changed', { usersConnected, usersReady } );
    } );
  }

  if ( socket.handshake.query.clinetType === "desktop" ) {
    currentIndex = -1;

    if ( !isGameCreated ) {
      io.emit( 'can create game' );
      canUsersConnect = true;
      usersConnected = [];

      socket.on( "game started", () => {
        canUsersConnect = false;
        gameStarted = true;

        io.emit( "game started" );
      } );

      socket.on( "scene change", ( index ) => {
        io.emit( "scene change", index );
        currentIndex = index;
      } );

      socket.on( "throw dice npc", (result) => {
        io.emit( "throw dice npc", result);
      } );

      socket.on( 'close throw info npc', () => {
        io.emit( "close throw info npc" );
      })

      socket.on( "game ended", () => {
        io.emit( "game ended" );
      } );

      socket.on( "user data changed", ( data ) => {
        io.emit( "user data changed", data )
      } )
    }
  }
} );


http.listen( 3000, function(){
  console.log('listening on *:3000');
} );
