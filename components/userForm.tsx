import { useEffect, useState } from 'react'
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react'

interface Props {
  usernameError?: string
  passwordError?: string
  onSubmit: (username: string, password: string) => void
  onBlur?: (field: 'username' | 'password') => void
}

const UserForm = (props: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameClasses, setUsernameClasses] = useState('')
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

  const bindFormEventData = (valueSetter: Dispatch<SetStateAction<string>>) => (
    (event: ChangeEvent<HTMLInputElement>) => valueSetter(event.target.value)
  )

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onSubmit(username, password)
  }

  return (
    <div className="p-4">
      <form onSubmit={submit}>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your username
          </label>
          <input
            id="username"
            className={`
              block w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none
              focus:ring-1 h-12 ${usernameClasses}
            `}
            placeholder="username"
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
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className={`
            block w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none
            focus:ring-1 h-12 ${passwordClasses}
          `}
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
        <button
          type="submit"
          className="
            text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg
            text-sm w-full sm:w-auto px-5 py-2.5 text-center
          "
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default UserForm
