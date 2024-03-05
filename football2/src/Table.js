import React, { useEffect, useState } from 'react';
import './Table.css';

const Table = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const apiUrl = "https://api.openligadb.de/getbltable/öbl1/2023";

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => a.place - b.place);
        const teamsToShow = sortedData.slice(0, 5);
        setTeamData(teamsToShow);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div id="result">
      {teamData.map(team => (
        <div key={team.teamName} className="wrapper">
          <img className="logo" src={team.teamIconUrl} style={{ height: '40px' }} alt={team.teamName} />
          <div className="team">{team.teamName}</div>
          <div className="circle">{team.won}</div>
          <div className="circle">{team.lost}</div>
          <div className="circle">{team.points}</div>
          <div className="wrt">{team.goalDiff}</div>
        </div>
      ))}
    </div>
  );
};

export default Table;