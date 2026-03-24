
// Formato de hora (HH:mm)
// Hora (00 a 23) -> ([01]?[0-9]|2[0-3])
// Puntos (:)
// Minutos (00 a 59) -> ([0-5][0-9])
const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/

const listHour = [
    "14:00",
    "24:15",
    "00:30",
    "4:60",
    "0:00",
]

// for (const time of listHour) {
//     console.log(timeRegex.test(time))
// }


// Formato de fecha (DD-MM-AAAA) (DD/MM/AAAA)
// (/) Guiones (-)
// Día (01 a 31) -> (0[1-9]|[12][0-9]|3[01])
// Mes (01 a 12) -> (0[1-9]|1[0-2])
// Año (4 dígitos) -> \d{4}
const dateRegex = /(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
const dateRegex1 = /(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

const listDate = [
    "31/12/2020",
    "30/02/2021",
    "15/08/2022",
    "00/01/2023",
    "31/13/2024",
    "31/02/2025",
    "28/02/2025",
]

// for (const date of listDate) {
//     console.log(dateRegex.test(date))
//     // console.log(dateRegex1.test(date))
// }


// Formato de correo electrónico
// Parte local (antes del @) -> [a-zA-Z0-9._%+-]+
// Simbolo (@)
// Dominio (después del @) -> [a-zA-Z0-9.-]+
// Punto (.)
// Extensión (después del punto) -> [a-zA-Z]{2,}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const emailRegex1 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/

const listEmail = [
    "user@example.com",
    "invalid-email",
    "claro@gmail.com",
    "usuario@espe.edu.ec",
    "usuario@espe.edu.ec.ec.ec",
    "usuario@espe.edu-ec"
]

// for (const email of listEmail) {
//     // console.log(emailRegex.test(email))
//     console.log(emailRegex1.test(email))
// }

// Formato de IP (XXX.XXX.XXX.XXX)
// Numero del 250 - 255 -> 25[0-5]
// Numero del 200 - 249 -> 2[0-4][0-9]
// Numero del 0 - 199 -> [01]?[0-9][0-9]?

const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

const listIp = [
    "192.168.1.1",
    "255.255.255.255",
    "256.0.0.1",
    "192.168.1.256",
    "192.168.1.1",
    "0.0.0.0"
]

// for (const ip of listIp) {
//     console.log(ipRegex.test(ip))
// }


// Formato Numeros
const numberRegex = /^\d+$/
const numberRegex1 = /^[1-9]\d*$/
const numberRegex2 = /^-[1-9]\d*$/
const numberRegex3 = /^-\d+$/
const numberRegex4 = /^-?[0-9]+\.[0-9]+$/

const listNumber: any = [
    123,
    0,
    -45,
    "70",
    "8w2",
    12.34,
    -12.34,
    -12.34435435,
]

// for (const number of listNumber) {
//     console.log(numberRegex4.test(number.toString()))
// }


// Formato para contraseña
// Al menos una letra minuscula -> (?=.*[a-z])
// Al menos una letra mayuscula -> (?=.*[A-Z])
// Al menos un dígito   -> (?=.*\d)
// Al menos un caracter especial -> (?=.*[@$!%*?&])
// Caracteres permitidos    -> [a-zA-Z\d@$!%*?&]
// Longitud mínima de 8 caracteres -> {8,}

const passwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.\-])[a-zA-Z\d@$!%*?&\.\-]{8,}$/

const listPasswd = [
    "Password123!",
    "password",
    "PASSWORD",
    "Pass123",
    "Passw0rd",
    "Passw0rd!",
]

// for (const passwd of listPasswd) {
//     console.log(passwdRegex.test(passwd))
// }


// Formato de numero de telefono
// Simbolo de país opcional -> \+?
// Código de área opcional (1 a 3 dígitos) -> (\d{1,3})?
// Separadores opcionales (espacios, guiones o puntos) -> [-.\s]?
// Codigo de area (1 a 4 dígitos) opcional entre paréntesis o no -> (\(?\d{1,4}\)?)
// Separadores opcionales (espacios, guiones o puntos) -> [-.\s]?
// Primer bloque de dígitos (1 a 4 dígitos) -> \d{1,4}
// Separadores opcionales (espacios, guiones o puntos) -> [-.\s]?
// Primer bloque de dígitos (1 a 4 dígitos) -> \d{1,4}

// const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)[-\s\.]?\d{1,4}[-.\s]?\d{1,4}$/;
const phoneRegex1 = /^(?:\+593[\s]?)?(\d{2,3})[\s]?(\d{3})[\s]?(\d{3,4})$/;

const listPhone = [
    "+593987654321",
    "+593 98 765 4321",
    "+593 987 654 321",
    "593 987 654 321",
    "+593 987654321",
    "987654321",
    "098-765-4321",
    "0987654321",
    "987654321",
    "98765432I",
    "+1 555-555-5555",
    "555-555-5555",
    "(555) 555-5555",
    "5555555555",
    "+44 20 7123 4567",
    "020 7123 4567",
    "+91-9876543210",
    "98765",
]

// for (const phone of listPhone) {
//     console.log(phoneRegex1.test(phone))
// }



// Formato url
// Protocolo (http, https) opcional -> (http?:\/\/)?
// Dominio o (Subdominio opcional) -> ([a-zA-Z0-9-]+\.)+
// Dominio de nivel superior (TLD) obligatorio (2-6 caracteres) -> [a-zA-Z]{2,6}
// Ruta y paametros opcionales
const urlRegex = /^(https?\:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/

const list_url = [
    "https://www.ejemplo.com",
    "http://subdominio.ejemplo.co.uk/ruta?query=valor#ancla",
    "www.ejemplo.org",
    "ejemplo.net",
    "https://ejemplo",
    "ftp://ejemplo.com",
    "https://www.ejemplo!.com",
    "https://docs.google.com/presentation/d/1puzRwLW6I7Jwi85LokCZ7v08AZ3bJofd/edit?slide=id.p6#slide=id.p6"
]

for (const url of list_url) {
    console.log(urlRegex.test(url))
}