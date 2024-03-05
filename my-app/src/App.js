import React from 'react';

const App = () => {
  const matches = [
    { team1: 'Macabi', team2: 'Valencia', score1: '86', score2: '82' },
    { team1: 'Zalgiris', team2: 'Macabi', score1: '75', score2: '73' },
    { team1: 'Barcelona', team2: 'Real Madrid', score1: '89', score2: '84' },
  ];

  const tableData = [
    { name: 'Macabi', wins: 4, losses: 2, points: 26, pointDiff: 13 },
    { name: 'Valencia', wins: 0, losses: 4, points: 25, pointDiff: -13 },
    { name: 'Zalgiris', wins: 4, losses: 8, points: 48, pointDiff: -33 },
  ];

  return (
    <div>
      <h1>EUROLEAGUE BASKETBALL</h1>
      <h2>Matches</h2>
      <table>
        <thead>
          <tr>
            <th>Team 1</th>
            <th>Score</th>
            <th>Team 2</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr key={index}>
              <td>{match.team1}</td>
              <td>{match.score1}</td>
              <td>{match.team2}</td>
              <td>{match.score2}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Table</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Points</th>
            <th>Point Difference</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((team, index) => (
            <tr key={index}>
              <td>{team.name}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.points}</td>
              <td>{team.pointDiff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;