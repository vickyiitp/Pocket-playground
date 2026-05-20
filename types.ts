import React from 'react';

export enum ExperienceCategory {
  Microgame = 'Microgame',
  MicroCreation = 'Micro-creation',
  MicroChallenge = 'Micro-challenge',
  SocialDuel = 'Social Duel',
  CuriosityBites = 'Curiosity Bites',
  RelaxMode = 'Relax Mode',
  KinaestheticPlay = 'Kinaesthetic Play',
  VocalPlay = 'Vocal Play',
  QuickLaughs = 'Quick Laughs',
}

export type ActiveFilterType = ExperienceCategory | 'All' | ExperienceCategory[];

export interface BaseExperience {
  id: string;
  // FIX: Removed 'category' from BaseExperience. This property was causing incorrect type widening for
  // the discriminated union 'MicroExperience'. Each specific experience type defines its own
  // 'category' with a literal enum member, which is the correct pattern.
  title: string;
  subtitle: string;
  duration: number; // in seconds
  instructions: string;
  shareText: string; // Can use {score} as a placeholder
  audioScript?: string;
  analyticsEvents: string[];
  noveltyCost: number;
  skillXpAward: Record<string, number>;
}

export interface MicrogameData extends BaseExperience {
  category: ExperienceCategory.Microgame;
}

export interface MicroCreationData extends BaseExperience {
  category: ExperienceCategory.MicroCreation;
}

export interface MicroChallengeData extends BaseExperience {
  category: ExperienceCategory.MicroChallenge;
  challenge: string;
}

export interface QuickLaughsData extends BaseExperience {
  category: ExperienceCategory.QuickLaughs;
  challenge: string;
}

export interface SocialDuelData extends BaseExperience {
  category: ExperienceCategory.SocialDuel;
  question: string;
  options: [string, string];
  correctOption: number;
}

export interface CuriosityBitesData extends BaseExperience {
  category: ExperienceCategory.CuriosityBites;
  facts: string[];
}

export interface RelaxModeData extends BaseExperience {
  category: ExperienceCategory.RelaxMode;
}

export interface KinaestheticPlayData extends BaseExperience {
  category: ExperienceCategory.KinaestheticPlay;
}

// FIX: Added 'challenge' to VocalPlayData to properly type vocal challenges.
export interface VocalPlayData extends BaseExperience {
  category: ExperienceCategory.VocalPlay;
  challenge: string;
}


export type MicroExperience =
  | MicrogameData
  | MicroCreationData
  | MicroChallengeData
  | SocialDuelData
  | CuriosityBitesData
  | RelaxModeData
  | KinaestheticPlayData
  | VocalPlayData
  | QuickLaughsData;