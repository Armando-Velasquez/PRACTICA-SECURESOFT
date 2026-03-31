import { z } from "zod";


type ValidationError = {
    field: string;
    message: string;
}

export function validateUser(data: any): ValidationError[] {
    const error: ValidationError[] = [];

    if (typeof data.firstname_user !== "string" || data.firstname_user.trim() === "") {
        error.push({
            field: "firstname_user",
            message: "El campo 'firstname_user' es obligatorio y debe ser una cadena de texto."
        })
    }

    if (typeof data.lastname_user !== "string" || data.lastname_user.trim() === "") {
        error.push({
            field: "lastname_user",
            message: "El campo 'lastname_user' es obligatorio y debe ser una cadena de texto."
        })
    }

    if (typeof data.identification_user !== "string" || data.identification_user.trim() === "") {
        error.push({
            field: "identification_user",
            message: "El campo 'identification_user' es obligatorio y debe ser una cadena de texto."
        })
    }

    if (typeof data.phone_user !== "string" || data.phone_user.trim() === "") {
        error.push({
            field: "phone_user",
            message: "El campo 'phone_user' es obligatorio y debe ser una cadena de texto."
        })
    }

    if (typeof data.id_role !== "number" || isNaN(data.id_role)) {
        error.push({
            field: "id_role",
            message: "El campo 'id_role' es obligatorio y debe ser un número."
        })
    }

    if (typeof data.email_auth !== "string" || data.email_auth.trim() === "") {
        error.push({
            field: "email_auth",
            message: "El campo 'email_auth' es obligatorio y debe ser una cadena de texto."
        })
    }

    if (typeof data.password_auth !== "string" || data.password_auth.trim() === "") {
        error.push({
            field: "password_auth",
            message: "El campo 'password_auth' es obligatorio y debe ser una cadena de texto."
        })
    }

    return error;
}



// Validate zod
export const UserSchema = z.object({

    firstname_user: z.string()
        .trim()
        .min(2, { message: 'Nombre debe ser al menos 2 caracteres' })
        .max(50, { message: 'Nombre no debe exceder 50 caracteres' })
        .regex(/^[a-zA-Z-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { message: 'Nombre solo puede contener letras y espacios' }),

    lastname_user: z.string()
        .trim()
        .min(2, { message: 'Apellido debe ser al menos 2 caracteres' })
        .max(50, { message: 'Apellido no debe exceder 50 caracteres' })
        .regex(/^[a-zA-Z-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { message: 'Apellido solo puede contener letras y espacios' }),

    identification_user: z.string()
        .trim()
        .regex(/^\d{10}$/, { message: 'Cédula debe tener exactamente 10 dígitos' }),

    phone_user: z.string()
        .trim()
        .regex(/^(?:\+593[\s]?)?(\d{2,3})[\s]?(\d{3})[\s]?(\d{3,4})$/, { message: 'Número de teléfono no es válido' }),

    id_role: z.number()
        .int({ message: 'ID de rol debe ser un número entero' })
        .positive({ message: 'ID de rol debe ser un número positivo' }),



    email_auth: z.email()
        .trim()
        .transform((email) => email.toLowerCase()), // Convertir a minúsculas para consistencia

    password_auth: z.string()
        .min(8, { message: 'Contraseña debe tener al menos 8 caracteres' })
        .max(100, { message: 'Contraseña no debe exceder 100 caracteres' })
        .regex(/[a-z]/, { message: 'Contraseña debe contener al menos una letra minúscula' })
        .regex(/[A-Z]/, { message: 'Contraseña debe contener al menos una letra mayúscula' })
        .regex(/\d/, { message: 'Contraseña debe contener al menos un número' })
        .regex(/[@$!%*?&\.\-]/, { message: 'Contraseña debe contener al menos un carácter especial (@$!%*?&.-)' })

})


// Validate zod
export const UserSchema2 = z.object({

    firstname_user: z.string()
        .trim()
        .min(2, { message: 'Nombre debe ser al menos 2 caracteres' })
        .max(50, { message: 'Nombre no debe exceder 50 caracteres' })
        .regex(/^[a-zA-Z-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { message: 'Nombre solo puede contener letras y espacios' })
        .optional(),

    lastname_user: z.string()
        .trim()
        .min(2, { message: 'Apellido debe ser al menos 2 caracteres' })
        .max(50, { message: 'Apellido no debe exceder 50 caracteres' })
        .regex(/^[a-zA-Z-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { message: 'Apellido solo puede contener letras y espacios' })
        .optional(),
    
    identification_user: z.string()
        .trim()
        .regex(/^\d{10}$/, { message: 'Cédula debe tener exactamente 10 dígitos' })
        .optional(),

    phone_user: z.string()
        .trim()
        .regex(/^(?:\+593[\s]?)?(\d{2,3})[\s]?(\d{3})[\s]?(\d{3,4})$/, { message: 'Número de teléfono no es válido' })
        .optional(),


    id_role: z.number()
        .int({ message: 'ID de rol debe ser un número entero' })
        .positive({ message: 'ID de rol debe ser un número positivo' })
        .optional(),

}).refine(data => Object.keys(data).length > 0, {  
    message: 'Almenos un campo debe ser proporcionado' 
})