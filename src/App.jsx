import { useState } from 'react';
import SolarSystem from './components/canvas/SolarSystem';
import Overlay from './components/ui/Overlay';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [timeScale, setTimeScale] = useState(1);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <SolarSystem 
        timeScale={timeScale} 
        selectedPlanet={selectedPlanet} 
        onPlanetSelect={setSelectedPlanet}
      />
      
      <Overlay 
        selectedPlanet={selectedPlanet}
        onClosePanel={() => setSelectedPlanet(null)}
        timeScale={timeScale}
        setTimeScale={setTimeScale}
      />
    </div>
  );
}

export default App;
