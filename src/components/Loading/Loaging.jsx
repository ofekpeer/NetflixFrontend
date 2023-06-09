import React from 'react'
import './Loading.scss'
import ClipLoader from 'react-spinners/ClipLoader'

function Loaging ({loading,size}) {
  return (
    <div className='loading-container'>
      <ClipLoader
        color={'#d91921'}
        loading={true}
        size={size ? size : 50}
        aria-label='Loading Spinner'
        data-testid='loader'
      ></ClipLoader>
      <span className='lable'>{loading}</span>
    </div>
  )
}

export default Loaging
