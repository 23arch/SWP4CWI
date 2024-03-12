import React from 'react'

export default function TableRow({ team }) {
    return (
        <div key={team.teamName} className="grid grid-cols-[50px,auto,80px,80px,80px,80px] border border-2 mb-2 border-black p-8 rounded-xl">
            <img className="" src={team.teamIconUrl} style={{ height: '40px' }} alt={team.teamName} />
            <div className="">{team.teamName}</div>
            <div className="invisible md:visible">{team.won}</div>
            <div className="invisible md:visible">{team.lost}</div>
            <div className="">{team.points}</div>
            <div className="">{team.goalDiff}</div>
        </div>
    )
}
