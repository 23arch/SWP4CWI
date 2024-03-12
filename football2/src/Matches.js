import React, { useEffect, useState } from 'react';
import './Matches.css';

const Matches = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    const apiUrl = "https://api.openligadb.de/getmatchdata/öbl1/2023";

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000;

        const matches = data.filter(match => {
          const matchDateTime = new Date(match.matchDateTime);
          return matchDateTime < currentDate && !match.matchIsFinished;
        });

        setUpcomingMatches(matches);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const addMatchesToContainer = (matches, limit) => {
    return matches.slice(0, limit).map(match => (
      <div key={match.matchID} className="wri">
        <div className="wrapper2">
          <img className="logo" src={match.team1.teamIconUrl} style={{ height: '2vw' }} alt={match.team1.teamName} />
          <div className="team">{match.team1.teamName}</div>
        </div>
        <div className="text2">
          {new Date(match.matchDateTime).toLocaleString('de-DE', {
            day: 'numeric',
            month: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
          })} 
        </div>
        <div className="wrapper2">
          <img className="logo" src={match.team2.teamIconUrl} style={{ height: '2vw' }} alt={match.team2.teamName} />
          <div className="team">{match.team2.teamName}</div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div id="upcomingMatches" className="matches-container">
        {addMatchesToContainer(upcomingMatches, 5)}
      </div>
      {upcomingMatches.length > 5 && (
        <button onClick={() => setUpcomingMatches(upcomingMatches.slice(0, upcomingMatches.length))}>Mehr anzeigen</button>
      )}
    </div>
  );
};

export default Matches;
