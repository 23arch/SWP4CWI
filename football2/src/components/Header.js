import React from 'react'

export default function Header() {
  return (
    <header className="mx-20 bg-slate-400">
      <div className="flex justify-between items-center mt-10 mr-20 ml-20 bg-slate-400">
        <img className="h-40" src="./oefbl.png" alt="" />
        <div className="Head">
          <div className="Table" href="Table"><a href="Table">Table</a></div>
          <div className="Matches" href="Matches"><a href="Matches">Matches</a></div>
        </div>
      </div>
    </header>
  )
}
