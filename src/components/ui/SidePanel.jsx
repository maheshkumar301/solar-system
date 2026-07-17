import { X } from 'lucide-react';
import './ui.css';

export default function SidePanel({ planet, onClose }) {
  if (!planet) return null;

  return (
    <div className="side-panel glass-panel transition-all">
      <button className="close-btn" onClick={onClose}>
        <X size={20} />
      </button>
      
      <div className="panel-header">
        <h2 style={{ color: planet.color || '#fff' }}>{planet.name}</h2>
        <span className="planet-type">{planet.facts.type}</span>
      </div>

      <div className="panel-content">
        <p className="description">{planet.description}</p>
        
        <div className="facts-grid">
          {Object.entries(planet.facts).map(([key, value]) => {
            if (key === 'type') return null; // Already shown
            return (
              <div className="fact-item" key={key}>
                <span className="fact-label">{key}</span>
                <span className="fact-value">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
