import React, { useState } from 'react'

const Card1 = () => {
    let [members,setMembers]=useState(5)
    let [revenue,setRevenue]=useState(10000)
    let [ptRequest,setPTrequest]=useState(2)

  return (
    <div className="card1-container">
        <aside className="cards">
            <h2 className='card-number'>{members}</h2>
            <p className='card-text'>Members</p>
        </aside>
        <aside className="cards">
            <h2 className='card-number'>₹{revenue}</h2>
            <p className='card-text'>Net Revenue</p>
        </aside>
        <aside className="cards">
            <h2 className='card-number'>{ptRequest}</h2>
            <p className='card-text'>PT Requests</p>
        </aside>
    </div>
  )
}

export default Card1