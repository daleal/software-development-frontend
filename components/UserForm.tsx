import { useEffect, useState } from 'react'
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react'

interface Props {
  usernameError?: string
  phoneNumberError?: string
  passwordError?: string
  loginError?: string
  showPhoneNumber?: boolean
  loading: boolean
  onSubmit: (username: string, password: string, phoneNumber?: string) => void
  onBlur?: (field: 'username' | 'phone-number' | 'password') => void
}

const UserForm = (props: Props) => {
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  const [usernameClasses, setUsernameClasses] = useState('')
  const [phoneNumberClasses, setPhoneNumberClasses] = useState('')
  const [passwordClasses, setPasswordClasses] = useState('')

  useEffect(() => {
    if (!!props.usernameError) {
      setUsernameClasses(`
        text-red-900 bg-red-50 border-red-500 placeholder-red-700
        focus:ring-red-500 focus:border-red-500
      `)
    } else {
      setUsernameClasses(`
        text-gray-900 bg-white border-slate-300 placeholder-slate-400
        focus:ring-blue-500 focus:border-blue-500
      `)
    }
  }, [props.usernameError])

  useEffect(() => {
    if (!!props.phoneNumberError) {
      setPhoneNumberClasses(`
        text-red-900 bg-red-50 border-red-500 placeholder-red-700
        focus:ring-red-500 focus:border-red-500
      `)
    } else {
      setPhoneNumberClasses(`
        text-gray-900 bg-white border-slate-300 placeholder-slate-400
        focus:ring-blue-500 focus:border-blue-500
      `)
    }
  }, [props.phoneNumberError])

  useEffect(() => {
    if (!!props.passwordError) {
      setPasswordClasses(`
        text-red-900 bg-red-50 border-red-500 placeholder-red-700
        focus:ring-red-500 focus:border-red-500
      `)
    } else {
      setPasswordClasses(`
        text-gray-900 bg-white border-slate-300 placeholder-slate-400
        focus:ring-blue-500 focus:border-blue-500
      `)
    }
  }, [props.passwordError])

  useEffect(() => {
    if (!!props.loginError) {
      setUsernameClasses(`
        text-red-900 bg-red-50 border-red-500 placeholder-red-700
        focus:ring-red-500 focus:border-red-500
      `)
      setPasswordClasses(`
        text-red-900 bg-red-50 border-red-500 placeholder-red-700
        focus:ring-red-500 focus:border-red-500
      `)
    } else {
      setUsernameClasses(`
        text-gray-900 bg-white border-slate-300 placeholder-slate-400
        focus:ring-blue-500 focus:border-blue-500
      `)
      setPasswordClasses(`
        text-gray-900 bg-white border-slate-300 placeholder-slate-400
        focus:ring-blue-500 focus:border-blue-500
      `)
    }
  }, [props.loginError])

  const bindFormEventData = (valueSetter: Dispatch<SetStateAction<string>>) => (
    (event: ChangeEvent<HTMLInputElement>) => valueSetter(event.target.value)
  )

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!props.loading) {
      props.onSubmit(username, password, phoneNumber)
    }
  }

  return (
    <div className="p-4">
      <form onSubmit={submit}>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nombre de usuario
          </label>
          <input
            id="username"
            className={`
              block w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none
              focus:ring-1 h-12 ${usernameClasses}
            `}
            placeholder="username"
            disabled={props.loading}
            value={username}
            onChange={bindFormEventData(setUsername)}
            onBlur={() => props.onBlur?.('username')}
            required
          />
          { !!props.usernameError &&
            <p className="mt-1 text-sm text-red-900">
              { props.usernameError }
            </p>
          }
        </div>
        { !!props.showPhoneNumber &&
          <div className="mb-6">
            <label
              htmlFor="phone-number"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Numero de teléfono
            </label>
            <input
              id="phone-number"
              className={`
                block w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none
                focus:ring-1 h-12 ${phoneNumberClasses}
              `}
              placeholder="+569..."
              disabled={props.loading}
              value={phoneNumber}
              onChange={bindFormEventData(setPhoneNumber)}
              onBlur={() => props.onBlur?.('phone-number')}
              required
            />
            { !!props.phoneNumberError &&
              <p className="mt-1 text-sm text-red-900">
                { props.phoneNumberError }
              </p>
            }
          </div>
        }
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className={`
              block w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none
              focus:ring-1 h-12 ${passwordClasses}
            `}
            placeholder="password..."
            disabled={props.loading}
            value={password}
            onChange={bindFormEventData(setPassword)}
            onBlur={() => props.onBlur?.('password')}
            required
          />
          { !!props.passwordError &&
            <p className="mt-1 text-sm text-red-900">
              { props.passwordError }
            </p>
          }
        </div>
          { !!props.loginError &&
            <p className="mb-5 text-sm text-red-900">
              { props.loginError }
            </p>
          }
        <button
          type="submit"
          className="
            text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg
            text-sm w-full sm:w-auto px-5 py-2.5 text-center
          "
          disabled={props.loading}
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default UserForm
