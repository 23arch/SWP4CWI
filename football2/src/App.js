import React from 'react';
import * as ReactDOM from "react-dom";
import Table from './Table';
import Matches from './Matches';
import './App.css';
import Header from './components/Header';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";




function App() {


  const router = createBrowserRouter([
    {
      path: "/Matches",
      element: <div>
        <Header />
        <Matches />
      </div>

    },
    {
      path: "/Table",
      element: <div>
        <Header />
        <Table />
      </div>
    },
  ]
  );

  return (

    <RouterProvider router={router} />

  );
}

export default App;
