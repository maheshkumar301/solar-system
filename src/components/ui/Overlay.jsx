import './ui.css';
import SidePanel from './SidePanel';
import TimeControls from './TimeControls';

export default function Overlay({ 
  selectedPlanet, 
  onClosePanel, 
  timeScale, 
  setTimeScale 
}) {
  return (
    <div className="ui-container">
      {/* Top Bar Navigation */}
      <div className="top-bar">
        <div className="logo-container ui-interactive">
          <h1>Solar System</h1>
          <p>Interactive 3D Explorer</p>
        </div>
        
        {/* Simple navigation or buttons could go here */}
        <div className="nav-menu ui-interactive">
          <button className="nav-btn" onClick={() => onClosePanel()}>
            Reset View
          </button>
        </div>
      </div>

      {/* Side Panel for planet details */}
      <SidePanel planet={selectedPlanet} onClose={onClosePanel} />

      {/* Bottom Bar for controls */}
      <div className="bottom-bar">
        <TimeControls timeScale={timeScale} setTimeScale={setTimeScale} />
      </div>

      {/* Watermarks */}
      <div className="watermark watermark-left">
        MK
      </div>
      <div className="watermark watermark-right">
        MK
      </div>
    </div>
  );
}
