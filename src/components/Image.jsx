import React from 'react'
import storeGif from '../assets/store-sticker.png'

const Image = () => {
  return (
    <img className='w-full mx-auto md:w-[45%]' src={storeGif} alt='Store Gif'></img>
  )
}

export default Image