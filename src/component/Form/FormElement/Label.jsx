import React from 'react'

const Label = (props) => {
  return (
    <label className='font-medium text-slate-600'>{props.children}</label>
  )
}

export default Label