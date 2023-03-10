#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 모듈 가져오기
const app_1 = __importDefault(require("../app"));
const http_1 = __importDefault(require("http"));
const debug_1 = __importDefault(require("debug"));
// 디버거 설정
const debug = (0, debug_1.default)('portpoliosite:server');
// 포트 설정
const port = normalizePort(process.env.PORT || '3000');
app_1.default.set('port', port);
// HTTP 서버 생성
const server = http_1.default.createServer(app_1.default);
// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
// Normalize a port into a number, string, or false.
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
// HTTP 서버 에러 이벤트를 위한 리스너
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
// Event listener for HTTP server "listening" event.
function onListening() {
    let addr = server.address();
    if (addr === null) {
        addr = 'null';
    }
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
