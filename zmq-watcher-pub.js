'use strict'
const fs = require('fs');
const zmq = require('zeromq');
const fileName = process.argv[2];

// publisher end point
const publisher = zmq.socket('pub');
fs.watch(fileName,  ()=> {
    // send messge to subscriber
    publisher.send(JSON.stringify({
        type:'changed',
        file: fileName,
        timeStamp: Date.now()
    }));
});

// listen on tcp port 60400
publisher.bind('tcp://*:60400', err => {
    if(err){
        throw err;
    }
    console.log('Listening for ZMQ subscriber...');
});