import 'module-alias/register';
import fs from 'fs';
import path from 'path';
import { Application } from 'express';

export function loadRoutes(app: Application, appVersion: string) {
    const srcPath = path.join(__dirname);

    const isRouteFile = (file: string) => file.endsWith('.routes.ts') || file.endsWith('.routes.js');
    const getRouteName = (file: string) => file.replace('.routes.ts', '').replace('.routes.js', '');

    const loadDirectoryRoutes = (basePath: string) => {

        fs.readdirSync(basePath).forEach((file: string) => {
            
            const fullPath = path.join(basePath, file);

            if (fs.statSync(fullPath).isDirectory()) {
                loadDirectoryRoutes(fullPath);
            } else if (isRouteFile(file)) {

                const routerName = getRouteName(file);
                const routePath = `${appVersion}/${routerName}`;
                // const routePath = appVersion + '/' + routerName;
                console.log(`Cargando ruta: ${routePath}`);

                // Importacion dinamica
                import(fullPath)
                .then((routeModule: any) => {
                    app.use(routePath, routeModule.default);
                })
                .catch((err: any) => {
                    console.error(`Error al cargar la ruta ${routePath} desde ${fullPath}:`, err);
                })

            }

        });
    }

    loadDirectoryRoutes(srcPath);
}