import React from 'react'
import './Error.scss'

function Error ({error,color}) {
  return (
    <div className='error-container'>
      <h3 style={color ? {color:color} : "red"} className='title'>
        Ops.......... some error
      </h3>
      <p style={color ? {color:color} : "red"}>
        {error}
      </p>
    </div>
  )
}

export default Error
