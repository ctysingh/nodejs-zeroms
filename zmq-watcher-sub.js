'use strict';
const zmq = require('zeromq');

// subscriber end point
const subscriber = zmq.socket('sub');

subscriber.subscribe('');

// handle message from publisher
subscriber.on('message', data => {
    const message = JSON.parse(data);
    const date = new Date(message.timeStamp);
    console.log(`File "${message.file}" changed at ${date}`);
})

// connet to publisher
subscriber.connect("tcp://localhost:60400");