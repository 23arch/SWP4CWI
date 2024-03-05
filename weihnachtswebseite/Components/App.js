import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChristmasTree from './components/ChristmasTree';
import GreetingMessage from './components/GreetingMessage';

const App = () => {
  return (
    <div className="app text-center">
      <Header />
      <main>
        <ChristmasTree />
        <GreetingMessage />
        {}
      </main>
      <Footer />
    </div>
  );
};

export default App;
