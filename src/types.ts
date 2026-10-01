export type ActiveTab = 'portal' | 'evertale' | 'parent' | 'genie' | 'garden' | 'observatory' | 'grimoire' | 'gallery';

export type Archetype = 'Brave Hero' | 'Royal Princess/Prince' | 'Cosmic Explorer' | 'Animal Guardian' | 'Master Inventor';

export interface CartoonScene {
  sceneNumber: number;
  setting: string;
  narration: string;
  zephyrAction: string;
}

export interface EverTaleChapter {
  id: string;
  childName: string;
  age: number;
  archetype: Archetype;
  specialMemory?: string;
  favoriteThing?: string;
  chapterTitle: string;
  storyTagline: string;
  inductionCartoonScript: CartoonScene[];
  miniGameTitle: string;
  miniGameDescription: string;
  miniGameObjective: string;
  coloringBookPrompt: string;
  parentCommandCenterNote: string;
  heirloomQuote: string;
  createdAt: string;
}

export interface GenieWishResponse {
  greeting: string;
  poeticBlessing: string;
  stardustGuidance: string;
  cosmicCatalyst: string;
  magicElement: string;
}

export interface WishRecord {
  id: string;
  seekerName: string;
  genie: string;
  category: string;
  wishText: string;
  response: GenieWishResponse;
  date: string;
}

export interface FloatingLotus {
  id: string;
  intention: string;
  seeker: string;
  color: string;
  x: number;
  y: number;
  speed: number;
}

export interface CosmicOrb {
  id: string;
  name: string;
  constellation: string;
  color: string;
  gradient: string;
  prophecy?: string;
  luckyNumbers?: number[];
  auraColor?: string;
  celestialSign?: string;
}

