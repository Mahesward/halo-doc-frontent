import React from 'react';
import { CARDS, FEATURES_CARD, FOOTER, SLIDER, STATS, TEAM } from '../components';

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
