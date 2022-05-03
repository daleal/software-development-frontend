import type { NextPage } from 'next'

const Signup: NextPage = () => {
  return (
    <div className="p-4">
      <form>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your username
          </label>
          <input
            id="username"
            className="
              block w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none
              focus:ring-1 h-12
              text-body-txt-color bg-white border-slate-300 placeholder-slate-400
              focus:ring-blue-500 focus:border-blue-500
            "
            placeholder="username"
            required
          />
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
            className="
              block w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none
              focus:ring-1 h-12
              text-body-txt-color bg-white border-slate-300 placeholder-slate-400
              focus:ring-blue-500 focus:border-blue-500
            "
            required
          />
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

export default Signup
