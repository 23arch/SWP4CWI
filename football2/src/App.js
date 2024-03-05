import React from 'react';
import Table from './Table';
import Matches from './Matches';
import './App.css';

function App() {
  return (
    <div>
      <header style={{marginRight: '20px', marginLeft: '20px'}}>
        <div className="container">
          <img className="LOGOH" src="Oefbl.png" alt="" />
          <div className="Head">
            <div className="Table" href="Table.html"><a href="Table.html">Table</a></div>
            <div className="Matches" href="Matches.html"><a href="Matches.html">Matches</a></div>
          </div>
        </div>
      </header>

      <div className="wrapperheader">
        <div className="Table2">Table</div>
      </div>

      <Table />
      <Matches />
    </div>
  );
}

export default App;
