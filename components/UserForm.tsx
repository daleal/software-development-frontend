import { useState } from "react";
import type { FormEvent } from "react";
import Input from "./Input";
import Link from "next/link";

interface Props {
  formTitle: string;
  buttonText: string;
  usernameError?: string;
  phoneNumberError?: string;
  passwordError?: string;
  loginError?: string;
  showPhoneNumber?: boolean;
  showRegisterLink?: boolean;
  loading: boolean;
  onSubmit: (username: string, password: string, phoneNumber?: string) => void;
  onBlur?: (field: "username" | "phone-number" | "password") => void;
}

const UserForm = (props: Props) => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!props.loading) {
      props.onSubmit(username, password, phoneNumber);
    }
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/">
            <a>
              <img
                className="mx-auto h-24 w-auto"
                src="/rentool-logo.svg"
                alt="Workflow"
              />
            </a>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {props.formTitle}
          </h2>
          {props.showRegisterLink && (
            <p className="mt-2 text-center text-sm text-gray-600">
              O bien{" "}
              <Link href="/signup">
                <a className="font-medium text-blue-600 hover:text-blue-800">
                  crea una nueva cuenta aquí
                </a>
              </Link>
            </p>
          )}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={submit}>
              <Input
                id="username"
                name="username"
                label="Nombre de usuario"
                type="username"
                autoComplete="username"
                placeholder="Nombre de usuario"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => props.onBlur?.("username")}
                error={props.usernameError}
              />

              {props.showPhoneNumber && (
                <Input
                  label="Número de teléfono"
                  id="phone-number"
                  name="phone-number"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+569 12345678"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={() => props.onBlur?.("phone-number")}
                  error={props.phoneNumberError}
                />
              )}

              <Input
                label="Contraseña"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="contraseña "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => props.onBlur?.("password")}
                error={props.passwordError}
              />

              <div>
                {props.loginError && (
                  <p className="mt-2 text-sm text-red-600">
                    {props.loginError}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
                >
                  {props.buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
