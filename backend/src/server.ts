import 'module-alias/register';
import express, { Application } from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import { loadRoutes } from '@/src/route';

const apiVersion = '/api/v1';

export class Server {
    app: Application;
    port: string | number;
    server: http.Server | https.Server;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = http.createServer(this.app);

        // Middleware
        this.app.use(express.json());
        // this.app.use(express.json({ limit: '10mb' }));
        // this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    }

    listen() {

        // configuración de CORS
        // this.app.use(cors({
        //     origin: '*', 
        //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        //     allowedHeaders: ['Content-Type', 'Authorization']
        // }));
        this.app.use(cors());

        // Archivo public
        this.app.use(express.static('public'));

        // http://localhost:3000/api/v1
        this.app.get(apiVersion + '/', (req, res) => {
            res.send('¡Bienvenido a la API de SecureSoft!');
        })

        // http://localhost:3000/api/v1/payload
        // this.app.use(apiVersion + '/payload', require('./Payload/payload.routes').default);

        // Cargar rutas dinámicamente
        loadRoutes(this.app, apiVersion);

        // Iniciar servidor
        this.server.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        })
    }

}