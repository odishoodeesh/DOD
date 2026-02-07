
export enum ScenarioType {
  GYM = 'GYM',
  BEDROOM = 'BEDROOM',
  PROFESSIONAL = 'PROFESSIONAL',
  STREET_STYLE = 'STREET_STYLE',
  LUXURY = 'LUXURY',
  CASUAL = 'CASUAL',
  CREATIVE = 'CREATIVE',
  TRAVEL = 'TRAVEL',
  MINIMALIST = 'MINIMALIST',
  DARK_MOODY = 'DARK_MOODY'
}

export interface Scenario {
  id: ScenarioType;
  name: string;
  description: string;
  icon: string;
  basePrompt: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  timestamp: number;
}
