import styles from "./Input.module.css"

interface IInputProps{
  inputType:string,
  error:string,
  label:string,
  value:string,
  name:string,
  handleChange:(e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({inputType, error, label, value, name, handleChange}:IInputProps) => {
  return (
    <div className={styles.input}>
      <label>{label}:</label>
      <input onChange={handleChange} name={name} type={inputType} value={value}/>
      {error && <span style={{color: "red"}}>{error}</span>}
    </div>
  )
}
