import React, { useEffect, useState } from 'react';
import './Table.css';
import TableRow from './components/TableRow';

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
    <>

      <div className="grid grid-cols-[10%,auto,80px,80px,80px,80px]  mb-2 border-black p-8 rounded-xl mt-px">
        <div class="font-inter text-24">Table</div>
        <div class="Team2"></div>
        <div class="font-inter text-24">S</div>
        <div class="font-inter text-24">N</div>
        <div class="font-inter text-24">Pkt</div>
        <div class="font-inter text-24">Diff</div>
      </div>
      <div id="result">
        {teamData.map(team => (
          <TableRow team={team}></TableRow>
        ))}
      </div>

    </>
  );
};

export default Table;