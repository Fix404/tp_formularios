import { InferType } from "yup";
import { usuarioSchema } from "../../schemas/formSchema";
import styles from "./Button.module.css"

type formValuesProps=InferType<typeof usuarioSchema>

interface IButtonProps{
  formValues: formValuesProps,
  errors:Partial<Record<keyof formValuesProps, string>>
}


export const Button = ({errors, formValues}:IButtonProps) => {
  const hayError=Object.values(errors).some(error => !!error);
  const campoVacio=Object.values(formValues).some(value => value === "")
  const okButton= !(hayError || campoVacio);
  return (
    <div className={styles.button}>
      <button disabled={!okButton} type="submit">Enviar</button>
    </div>
  )
}
