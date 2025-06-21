import React from 'react'

const Stats = ({number, text}) => {
  return (
    <div className="bg-[#ffffff] bg-opacity-10 p-3 rounded-xl">
      <p className='font-semibold'>{number}</p>
      <p>{text}</p>
    </div>
  )
}

export default Stats