const { Server } = require('../index');

new Server({
    port: 9119,
    transport: '@namics/remlog-transports/Console',
    cors: ['impulscoach.local.namics.com:3000']
}).start();
