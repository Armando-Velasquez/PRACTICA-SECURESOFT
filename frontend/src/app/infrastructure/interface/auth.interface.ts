import { User } from "./user.interface";

export interface Auth {
    id_auth?: number;
    email_auth: string;
    password_auth: string;
    salt_auth: string;

    mfa_secret: string | null;
    mfa_enabled: boolean;

    id_user: number;

    user?: User;
}
