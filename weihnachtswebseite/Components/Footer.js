import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-red-500 text-white p-2 fixed bottom-0 w-full">
      <p>&copy; {new Date().getFullYear()} Weihnachtswebseite</p>
    </footer>
  );
};

export default Footer;
