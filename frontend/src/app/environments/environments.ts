const hostname = window.location.hostname;

let apiHost = 'http://localhost:9000';

if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
  apiHost = 'http://192.168.2.221:9000';
}

export const environment = {
  production: false,
  apiUrl: apiHost,
};
