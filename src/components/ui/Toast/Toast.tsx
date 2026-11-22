import { MdVerified } from 'react-icons/md'
import './Toast.css'

interface ToastProps {
  message: string
  leaving: boolean
}

/** Aviso breve que entra deslizándose desde la derecha. */
export default function Toast({ message, leaving }: ToastProps) {
  return (
    <div
      role="status"
      className={`toast-item flex items-center gap-3 border border-lavender/60 bg-deep px-5 py-3 font-mono text-xs uppercase tracking-wider text-white shadow-2xl ${
        leaving ? 'is-leaving' : ''
      }`}
    >
      <MdVerified size={16} className="text-lavender" aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}
