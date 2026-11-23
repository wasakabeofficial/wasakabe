import './FormField.css'

interface BaseProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}

interface InputProps extends BaseProps {
  kind?: 'input'
  type?: 'text' | 'email'
}

interface TextareaProps extends BaseProps {
  kind: 'textarea'
  rows?: number
}

interface SelectProps extends BaseProps {
  kind: 'select'
  options: readonly string[]
}

type FormFieldProps = InputProps | TextareaProps | SelectProps

const lineControl =
  'form-field-control w-full border-0 border-b border-lightpurple/25 bg-transparent px-0 py-3 font-sans text-base text-white transition-colors focus:outline-none'

/** Campo de formulario con etiqueta flotante y línea que se dibuja al enfocar. */
export default function FormField(props: FormFieldProps) {
  const { id, label, value, onChange, required } = props

  if (props.kind === 'select') {
    return (
      <div className="form-field flex flex-col">
        <label htmlFor={id} className="mb-2 text-[11px] uppercase tracking-[0.2em] text-lightpurple/80">
          {label}
        </label>
        <select
          id={id}
          value={value}
          required={required}
          onChange={(event) => onChange(event.target.value)}
          className={`${lineControl} cursor-pointer bg-deep`}
        >
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="form-field-line" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className="form-field flex flex-col">
      {props.kind === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          required={required}
          rows={props.rows ?? 3}
          placeholder=" "
          onChange={(event) => onChange(event.target.value)}
          className={`${lineControl} resize-none placeholder:text-transparent`}
        />
      ) : (
        <input
          id={id}
          type={props.type ?? 'text'}
          value={value}
          required={required}
          placeholder=" "
          onChange={(event) => onChange(event.target.value)}
          className={`${lineControl} placeholder:text-transparent`}
        />
      )}
      <label htmlFor={id} className="form-field-label">
        {label}
      </label>
      <span className="form-field-line" aria-hidden="true" />
    </div>
  )
}
