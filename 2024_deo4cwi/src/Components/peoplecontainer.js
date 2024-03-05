import React, { useEffect, useState } from 'react'
import Card from 'card.js'
 
 
 
export default function Peoplecontainers() {
 
 
   
 
    const [people, setpeople] =useState([ ]);
 
    useEffect(()=>{
    fetch("https://65b256549bfb12f6eafd7ce4.mockapi.io/:endpoint").then(res=>  res.json().then(data=>{
        setpeople(data);    
 
    }))
    },[])
    return (
       
       
        <div>
            <h1 className='text-3xl font-bold mb-20 mt-0'>Weihnachts Elven Liste:</h1>
               <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'   >
                    {people.map(person => {
                        return <Card name={person.name} imageUrl={person.avatar} location={person.ort} street={person.street}/>  
                    })}
                </div>
                </div>  
       
    );
}