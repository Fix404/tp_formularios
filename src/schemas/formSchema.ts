import { object, ref, string } from "yup"

export const usuarioSchema=object({
    nombre: string().required("Este campo es obligatorio").min(3, "El nombre debe poseer al menos tres caracteres"),
    email: string().required("Este campo es obligatorio").email("Debe ingresar un email con formato válido"),
    password: string().required("Este campo es obligatorio").min(6, "La constraseña debe contener al menos seis caracteres"),
    passwordOk: string().required("Este campo es obligaotio").oneOf([ref('password')], "Las contraseñas debe coincidir")
})
