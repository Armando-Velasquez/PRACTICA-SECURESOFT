import 'module-alias/register';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

import { Server } from '@/src/server';

// Crear instancia del servidor y escuchar
const server = new Server();
server.listen();