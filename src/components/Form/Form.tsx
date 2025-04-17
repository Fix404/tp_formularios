import { InferType, ValidationError } from "yup"
import { usuarioSchema } from "../../schemas/formSchema"
import { Input } from "../Input/Input"
import { useState } from "react"

type formValuesProps=InferType<typeof usuarioSchema>

const initialValues={
  nombre:"",
  email:"",
  password:"",
  passwordOk:""
}

export const Form = () => {
  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors]= useState<Partial<Record<keyof formValuesProps, string>>>({})
  const handleChange= async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target;
    const actValues={...formValues, [name]: value};
    setFormValues(actValues)
    try{
      await usuarioSchema.validateAt(name, actValues)
      setErrors((prevErrors) => ({...prevErrors, [name]: ""}))
    }catch(error){
      if (error instanceof ValidationError) {
        // ya puedes acceder con confianza a err.message
        setErrors((prev) => ({ ...prev, [name]: error.message }));
      } else {
        console.error("Error inesperado", error);
      }
    }
  }
  return (
    <div>
      <form>
      <Input inputType="text" error={errors.nombre || ""} label="Nombre" value={formValues.nombre} name="nombre" handleChange={handleChange}/>
      <Input inputType="email" error={errors.email || ""} label="Correo" value={formValues.email} name="email" handleChange={handleChange}/>
      <Input inputType="password" error={errors.password || ""} label="Contraseña" value={formValues.password} name="password" handleChange={handleChange}/>
      <Input inputType="password" error={errors.passwordOk || ""} label="Confirmar contraseña" value={formValues.passwordOk} name="passwordOk" handleChange={handleChange}/>
      </form>
    </div>
  )
}
