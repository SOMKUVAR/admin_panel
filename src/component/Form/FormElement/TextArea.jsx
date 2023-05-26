import React from 'react'

const TextArea = (props) => {
  return (
    <textarea
    className="appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    {...props}
  />
  )
}

export default TextArea