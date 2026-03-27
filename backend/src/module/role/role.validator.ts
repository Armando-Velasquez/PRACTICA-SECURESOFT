import { body, param } from "express-validator";

export const validateCreateRole = [
    body("name_role")
        .notEmpty().withMessage("El nombre del rol es requerido")
        .isLength({ min: 3, max: 30 }).withMessage("El nombre del rol debe tener entre 3 y 30 caracteres")
        .trim() // Elimina espacios al inicio y al final
        .escape() // Escapa caracteres especiales para prevenir XSS
]

export const validateUpdateRole = [
    param("id")
        .isInt().withMessage("El ID del rol debe ser un número entero"),

    body("name_role")
        .notEmpty().withMessage("El nombre del rol es requerido")
        .isLength({ min: 3, max: 30 }).withMessage("El nombre del rol debe tener entre 3 y 30 caracteres")
        .trim() // Elimina espacios al inicio y al final
        .escape() // Escapa caracteres especiales para prevenir XSS
]

export const validateId = [
    param("id")
        .isInt().withMessage("El ID del rol debe ser un número entero")
]