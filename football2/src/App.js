import React from 'react';
import Table from './Table';
import Matches from './Matches';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      <div className=""></div>
      <Table />
      <Matches />
    </div>
  );
}

export default App;
