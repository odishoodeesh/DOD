
import React from 'react';
import { Scenario, ScenarioType } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: ScenarioType.GYM,
    name: "Gym",
    description: "Athletic & Fitness",
    icon: "💪",
    basePrompt: "A hyper-realistic photograph of a person in a high-end luxury modern gym, cinematic lighting, subtle sweat on skin, sharp focus, 8k resolution, athletic build, high-end gym equipment blurred in background, professional fitness photography style."
  },
  {
    id: ScenarioType.BEDROOM,
    name: "Aesthetic Room",
    description: "Cozy & Lifestyle",
    icon: "🛌",
    basePrompt: "A serene and cozy aesthetic bedroom interior, soft morning natural sunlight through sheer curtains, high-end bedding textures, indoor plants, minimalist lifestyle photography, ultra-realistic, warm color palette."
  },
  {
    id: ScenarioType.PROFESSIONAL,
    name: "Professional",
    description: "Corporate & LinkedIn",
    icon: "💼",
    basePrompt: "A sharp corporate professional portrait of a person in a modern high-rise office, blurred city skyline background, soft cinematic studio lighting, wearing premium business attire, executive presence, high-quality portrait photography."
  },
  {
    id: ScenarioType.STREET_STYLE,
    name: "Street Style",
    description: "Urban & Fashion",
    icon: "🌆",
    basePrompt: "High-fashion urban street photography, person wearing modern streetwear, rainy city street at night with neon reflections, cinematic depth of field, sharp focus, vibrant but moody colors, gritty high-detail textures."
  },
  {
    id: ScenarioType.LUXURY,
    name: "Luxury",
    description: "Premium & Elite",
    icon: "💎",
    basePrompt: "An elite luxury lifestyle shot, person boarding a sleek private jet or standing on a luxury yacht deck at sunset, premium designer clothing, golden hour lighting, rich textures of leather and mahogany, extremely detailed."
  },
  {
    id: ScenarioType.CASUAL,
    name: "Casual",
    description: "Natural Everyday",
    icon: "☕",
    basePrompt: "A natural and candid lifestyle photograph, person in a high-end coffee shop, soft natural window light, relaxed atmosphere, hyper-realistic skin textures, everyday casual but stylish outfit, cinematic quality."
  },
  {
    id: ScenarioType.CREATIVE,
    name: "Creative",
    description: "Artistic & Bold",
    icon: "🎨",
    basePrompt: "An avant-garde creative portrait, dramatic colorful lighting, neon accents, artistic smoke effects, high contrast, expressive composition, surreal but realistic textures, professional editorial fashion photography."
  },
  {
    id: ScenarioType.TRAVEL,
    name: "Travel",
    description: "Cinematic Global",
    icon: "✈️",
    basePrompt: "A breathtaking travel shot with a scenic landscape background like the Swiss Alps or Mediterranean coast, person in cinematic composition, wide angle, stunning lighting, ultra-high resolution travel photography."
  },
  {
    id: ScenarioType.MINIMALIST,
    name: "Minimalist",
    description: "Clean & Modern",
    icon: "⚪",
    basePrompt: "A clean minimalist portrait in a bright white studio, soft geometric shadows, high-fashion modern composition, neutral tones, focus on texture of clothing and sharp facial features, zen aesthetic."
  },
  {
    id: ScenarioType.DARK_MOODY,
    name: "Dark & Moody",
    description: "Shadows & Contrast",
    icon: "🌑",
    basePrompt: "A cinematic dark and moody portrait, low-key lighting, heavy shadows, high contrast, mysterious atmosphere, single sharp light source highlighting facial contours, rich dark tones, intense mood."
  }
];
