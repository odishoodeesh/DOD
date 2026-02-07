
import React from 'react';
import { Scenario } from '../types';

interface ScenarioCardProps {
  scenario: Scenario;
  onClick: (scenario: Scenario) => void;
  disabled?: boolean;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onClick, disabled }) => {
  return (
    <button
      onClick={() => onClick(scenario)}
      disabled={disabled}
      className={`group relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 p-6 text-left transition-all hover:border-blue-500 hover:scale-[1.02] active:scale-95 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="text-6xl">{scenario.icon}</span>
      </div>
      <div className="relative z-10">
        <div className="mb-4 text-3xl">{scenario.icon}</div>
        <h3 className="text-xl font-bold text-white mb-1">{scenario.name}</h3>
        <p className="text-sm text-neutral-400 font-medium">{scenario.description}</p>
      </div>
      
      {/* Decorative gradient flare on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
};

export default ScenarioCard;
