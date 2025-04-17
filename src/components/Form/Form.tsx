import { InferType, ValidationError } from "yup"
import { usuarioSchema } from "../../schemas/formSchema"
import { Input } from "../Input/Input"
import React, { useState } from "react"
import { Button } from "../Button/Button"
import Swal from "sweetalert2"
import styles from "./Form.module.css"

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
        setErrors((prev) => ({ ...prev, [name]: error.message }));
      } else {
        console.error("Error inesperado", error);
      }
    }
  }

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    Swal.fire({
      title:"Formulario enviado exitosamente",
      icon:"success",
      confirmButtonText:"Entendido"
    })
    setFormValues(initialValues)
  }
  return (
    <div className={styles.mainDiv}>
      <h1>Formulario:</h1>
      <div className={styles.formBox}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputs}>
        <Input inputType="text" error={errors.nombre || ""} label="Nombre" value={formValues.nombre} name="nombre" handleChange={handleChange}/>
      <Input inputType="email" error={errors.email || ""} label="Correo" value={formValues.email} name="email" handleChange={handleChange}/>
      <Input inputType="password" error={errors.password || ""} label="Contraseña" value={formValues.password} name="password" handleChange={handleChange}/>
      <Input inputType="password" error={errors.passwordOk || ""} label="Confirmar contraseña" value={formValues.passwordOk} name="passwordOk" handleChange={handleChange}/>
        </div>
        <div className={styles.button}>
        <Button errors={errors} formValues={formValues}/>
        </div>
      </form>
      </div>
    </div>
  )
}
