import React from 'react';
import { FEATURES_CARD, FOOTER, SLIDER, STATS } from '../components';


function Home() {
  return (
    <div className="w-full">
      <SLIDER />
      <FEATURES_CARD />
      <STATS />
      <FOOTER />
    </div>
  );
}

export default Home;
