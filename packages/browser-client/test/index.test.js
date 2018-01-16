import test from 'ava';
import { BrowserClient, defaultConfig } from '../index';

const exampleConfig = {
    host: 'https://remlog-web-srv.my-app.com',
    port: '8762',
    remote: {
        host: 'https://remlog-trace.my-app.com',
        port: 2679,
    },
};

test('Create a client successfully with default properties', t => {
    const client = new BrowserClient();
    t.deepEqual(client.config, defaultConfig);
});

test('Create a client with custom settings', t => {
    const client = new BrowserClient(exampleConfig);
    t.deepEqual(client.config, exampleConfig);
});

test('Creats the correct image node in the body with all params', t => {
    const client = new BrowserClient(exampleConfig);
    const payload = {
        level: 3,
        file: '@remlog/browser-client/test/index.test.js',
    };

    client.send('message', payload);

    const foundImage = document.body.querySelector('img');
    const expectedUrlFragment = `https://remlog-web-srv.my-app.com:8762/trace.jpg?remote=https://remlog-trace.my-app.com:2679&payload=`;

    t.is(foundImage.getAttribute('src').indexOf(expectedUrlFragment), 0);
});
