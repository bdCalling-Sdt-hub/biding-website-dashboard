import React from 'react'

const Button = ({onClick,children , className=''}) => {
  return (
    <button onClick={onClick} className={`bg-yellow text-white rounded-md w-full py-1 ${className}`}>{children}</button>
  )
}

export default Button