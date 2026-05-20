import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { MicroExperience, ActiveFilterType } from '../types';
import { ExperienceCategory } from '../types';

type AppState = 'INTENT_GATE' | 'SESSION_ACTIVE' | 'SESSION_ENDED' | 'GUIDED_TRANSITION';

interface SatiationNudgeData {
  fromCategory: string;
  recommendedCategory: string;
}

interface SessionContextType {
  appState: AppState;
  sessionTimeLeft: number;
  extensionsRemaining: number;
  noveltyTokens: number;
  experienceHistory: MicroExperience[];
  satiationNudge: SatiationNudgeData | null;
  initialSessionFilter: ActiveFilterType;
  startSession: (durationInSeconds: number, initialFilter?: ActiveFilterType) => void;
  extendSession: () => void;
  endSession: () => void;
  startGuidedTransition: () => void;
  resetApp: () => void;
  spendTokens: (amount: number) => void;
  addExperienceToHistory: (experience: MicroExperience) => void;
  clearSatiationNudge: () => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

const MAX_EXTENSIONS = 2;
const MAX_NOVELTY_TOKENS = 10;
const SATIATION_HISTORY_LENGTH = 3;

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>('INTENT_GATE');
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);
  const [extensionsRemaining, setExtensionsRemaining] = useState(MAX_EXTENSIONS);
  const [noveltyTokens, setNoveltyTokens] = useState(MAX_NOVELTY_TOKENS);
  const [experienceHistory, setExperienceHistory] = useState<MicroExperience[]>([]);
  const [satiationNudge, setSatiationNudge] = useState<SatiationNudgeData | null>(null);
  const [initialSessionFilter, setInitialSessionFilter] = useState<ActiveFilterType>('All');

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (appState === 'SESSION_ACTIVE' && sessionTimeLeft > 0) {
      timer = setInterval(() => {
        setSessionTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (appState === 'SESSION_ACTIVE' && sessionTimeLeft <= 0) {
      setAppState('SESSION_ENDED');
    }
    return () => clearInterval(timer);
  }, [appState, sessionTimeLeft]);

  const startSession = useCallback((durationInSeconds: number, initialFilter: ActiveFilterType = 'All') => {
    setSessionTimeLeft(durationInSeconds);
    setInitialSessionFilter(initialFilter);
    setAppState('SESSION_ACTIVE');
  }, []);

  const extendSession = useCallback(() => {
    if (extensionsRemaining > 0) {
      setSessionTimeLeft(prev => prev + 300); // Add 5 minutes
      setExtensionsRemaining(prev => prev - 1);
      setAppState('SESSION_ACTIVE');
    }
  }, [extensionsRemaining]);
  
  const endSession = useCallback(() => {
    setAppState('GUIDED_TRANSITION');
  }, []);

  const startGuidedTransition = useCallback(() => {
    setAppState('GUIDED_TRANSITION');
  }, []);

  const resetApp = useCallback(() => {
    setAppState('INTENT_GATE');
    setExtensionsRemaining(MAX_EXTENSIONS);
    // In a real app, token regen would be time-based from a server.
    // Here we just reset them for a new session.
    setNoveltyTokens(MAX_NOVELTY_TOKENS);
    setExperienceHistory([]);
    setInitialSessionFilter('All');
  }, []);

  const spendTokens = useCallback((amount: number) => {
    setNoveltyTokens(prev => Math.max(0, prev - amount));
  }, []);

  const clearSatiationNudge = useCallback(() => {
    setSatiationNudge(null);
  }, []);

  const addExperienceToHistory = useCallback((experience: MicroExperience) => {
    const newHistory = [...experienceHistory, experience];
    setExperienceHistory(newHistory);
    
    // Satiation Detector Logic
    if (newHistory.length >= SATIATION_HISTORY_LENGTH) {
      const lastThree = newHistory.slice(-SATIATION_HISTORY_LENGTH);
      const firstCategory = lastThree[0].category;
      if (lastThree.every(exp => exp.category === firstCategory)) {
        let recommendation: string;
        // FIX: Use enum members for type-safe comparison instead of string literals.
        if (firstCategory === ExperienceCategory.Microgame || firstCategory === ExperienceCategory.SocialDuel) {
          recommendation = ExperienceCategory.RelaxMode;
        } else if (firstCategory === ExperienceCategory.MicroCreation) {
          recommendation = ExperienceCategory.CuriosityBites;
        } else {
          recommendation = ExperienceCategory.Microgame;
        }
        setSatiationNudge({ fromCategory: firstCategory, recommendedCategory: recommendation });
      }
    }
  }, [experienceHistory]);

  const value = useMemo(() => ({
    appState,
    sessionTimeLeft,
    extensionsRemaining,
    noveltyTokens,
    experienceHistory,
    satiationNudge,
    initialSessionFilter,
    startSession,
    extendSession,
    endSession,
    startGuidedTransition,
    resetApp,
    spendTokens,
    addExperienceToHistory,
    clearSatiationNudge
  }), [appState, sessionTimeLeft, extensionsRemaining, noveltyTokens, experienceHistory, satiationNudge, initialSessionFilter, startSession, extendSession, endSession, startGuidedTransition, resetApp, spendTokens, addExperienceToHistory, clearSatiationNudge]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};