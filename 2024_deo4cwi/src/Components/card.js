import React from 'react'
 
function Card({name, imageUrl, location, street}) {
    return (
       
        <div className='border grid grid-cols-2 h-40'>
            <div className='flex-1 p-4'>
                <h2 className='font-bold text-xl'>{name}</h2>
                <p className=''> {location}</p>
                <p className=''> {street}</p>
            </div>
            <div className='w-full h-full'>
                <img src={imageUrl} alt='' className='object-cover w-full'/>
            </div>
        </div>
       
    )
}
 
export default Card