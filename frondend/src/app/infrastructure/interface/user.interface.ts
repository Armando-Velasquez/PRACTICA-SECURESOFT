import { Role } from "./role.interface";

export interface User {
    id_user?: number;
    firstname_user: string;
    lastname_user: string;
    identification_user: string;
    phone_user: string;
    location_user?: string | null;

    id_role: number;

    role?: Role;
} 
