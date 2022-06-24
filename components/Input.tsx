import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { nanoid } from "nanoid";
import React from "react";

type Props = {
  error?: string;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  ({ error, label, ...props }, ref) => {
    const inputFor = props.id || nanoid();
    const className = `appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm${
      " " + props.className || ""
    }`;
    return (
      <div>
        {label && (
          <label
            htmlFor={inputFor}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="mt-1 relative">
          <input id={inputFor} ref={ref} {...props} className={className} />
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600" id={`${inputFor}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
