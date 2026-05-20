import type { MicroExperience } from './types';
import { ExperienceCategory } from './types';
import React from 'react';

// Icon components
const GamepadIcon = (props: React.SVGProps<SVGSVGElement>) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 2.25a14.98 14.98 0 00-5.84 7.38m5.84 2.58v-4.8m0 4.8a14.98 14.98 0 01-6.16 12.12A14.98 14.98 0 0118.37 9.63a14.98 14.98 0 01-5.84-7.38" }));
const PaintBrushIcon = (props: React.SVGProps<SVGSVGElement>) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.622-3.385m-5.043.025a15.998 15.998 0 01-3.388-1.621m-4.903 9.497a15.998 15.998 0 01-1.622-3.385M3.027 16.511a15.998 15.998 0 01-1.622-3.385m5.043-.025a15.998 15.998 0 00-1.622-3.385m-3.388 1.62a15.998 15.998 0 001.622 3.385m-5.043.025a15.998 15.998 0 013.388 1.621m4.903-9.497a15.998 15.998 0 011.622 3.385" }));
const TrophyIcon = (props: React.SVGProps<SVGSVGElement>) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.5 18.75h-9a9 9 0 119 0zM16.5 18.75a9 9 0 00-9 0m9 0h.008v.008h-.008v-.008zm-9 0h-.008v.008h.008v-.008z" }));
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.031 1.258-1.954 2.1-2.733m-2.1 2.733c-.57-1.031-1.258-1.954-2.1-2.733m2.1 2.733V18m-2.1-2.962a9.094 9.094 0 00-3.741-.479 3 3 0 004.682-2.72M12 18.72v-2.962c.57 1.031 1.258 1.954 2.1 2.733m-2.1-2.733c-.57 1.031-1.258 1.954-2.1 2.733M12 3a9 9 0 100 18 9 9 0 000-18z" }));
const LightBulbIcon = (props: React.SVGProps<SVGSVGElement>) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a12.061 12.061 0 01-4.5 0m3.75 2.311a12.061 12.061 0 01-4.5 0m5.625-10.334a12.06 12.06 0 01-1.125 0m1.125 0c.413-.028.825-.072 1.237-.128m-1.237.128a12.06 12.06 0 00-1.125 0m1.125 0c.413.028.825.072 1.237.128m-1.237.128a12.06 12.06 0 00-1.125 0m1.125 0c.413.028.825.072 1.237.128M12 6.75a2.25 2.25 0 00-2.25 2.25v1.5a2.25 2.25 0 004.5 0v-1.5A2.25 2.25 0 0012 6.75z" }));
const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.423-1.423L13.25 18.5l1.188-.648a2.25 2.25 0 011.423-1.423L16.25 15.25l.648 1.188a2.25 2.25 0 011.423 1.423l1.188.648-1.188.648a2.25 2.25 0 01-1.423 1.423z" }));
const HandRaisedIcon = (props: React.SVGProps<SVGSVGElement>) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" }));
const MicrophoneIcon = (props: React.SVGProps<SVGSVGElement>) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m12 7.5v-1.5a6 6 0 00-6-6v-1.5a6 6 0 00-6 6v1.5m6 7.5a6 6 0 003.75-10.604M12 9.75v-1.5a6 6 0 016 6v1.5a6 6 0 01-6-6z" }));
const FaceSmileIcon = (props: React.SVGProps<SVGSVGElement>) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9V9.75zm6 0h.008v.008H15V9.75z" }));


export const CATEGORIES = {
    [ExperienceCategory.Microgame]: { 
        icon: GamepadIcon, 
        textColorClass: 'text-pink-400', 
        shadowClass: 'shadow-pink-500/30',
        glowColorVar: 'var(--category-microgame-glow-color)',
    },
    [ExperienceCategory.MicroCreation]: { 
        icon: PaintBrushIcon, 
        textColorClass: 'text-blue-400', 
        shadowClass: 'shadow-blue-500/30',
        glowColorVar: 'var(--category-microcreation-glow-color)',
    },
    [ExperienceCategory.MicroChallenge]: { 
        icon: TrophyIcon, 
        textColorClass: 'text-yellow-400', 
        shadowClass: 'shadow-yellow-500/30',
        glowColorVar: 'var(--category-microchallenge-glow-color)',
    },
    [ExperienceCategory.SocialDuel]: { 
        icon: UsersIcon, 
        textColorClass: 'text-purple-400',
        shadowClass: 'shadow-purple-500/30',
        glowColorVar: 'var(--category-socialduel-glow-color)',
    },
    [ExperienceCategory.CuriosityBites]: { 
        icon: LightBulbIcon, 
        textColorClass: 'text-green-400',
        shadowClass: 'shadow-green-500/30',
        glowColorVar: 'var(--category-curiosity-glow-color)',
    },
    [ExperienceCategory.RelaxMode]: { 
        icon: SparklesIcon, 
        textColorClass: 'text-cyan-400',
        shadowClass: 'shadow-cyan-500/30',
        glowColorVar: 'var(--category-relax-glow-color)',
    },
    [ExperienceCategory.KinaestheticPlay]: {
        icon: HandRaisedIcon,
        textColorClass: 'text-rose-400',
        shadowClass: 'shadow-rose-500/30',
        glowColorVar: 'var(--category-kinaesthetic-glow-color)',
    },
    [ExperienceCategory.VocalPlay]: {
        icon: MicrophoneIcon,
        textColorClass: 'text-orange-400',
        shadowClass: 'shadow-orange-500/30',
        glowColorVar: 'var(--category-vocal-glow-color)',
    },
     [ExperienceCategory.QuickLaughs]: {
        icon: FaceSmileIcon,
        textColorClass: 'text-amber-400',
        shadowClass: 'shadow-amber-500/30',
        glowColorVar: 'var(--category-quicklaughs-glow-color)',
    }
};

export const INITIAL_EXPERIENCES: MicroExperience[] = [
    {
        id: 'mg_1_v2',
        category: ExperienceCategory.Microgame,
        title: 'Dot Dodger',
        subtitle: 'Tap the dot, fast!',
        duration: 15,
        instructions: 'A red dot will appear on the screen. Tap it as many times as you can before the time runs out.',
        shareText: 'I scored {score} points in Dot Dodger!',
        noveltyCost: 1,
        skillXpAward: { 'focus': 10, 'reflexes': 15 },
        analyticsEvents: ['game_started', 'game_completed'],
    },
    {
        id: 'mc_1_v2',
        category: ExperienceCategory.MicroCreation,
        title: 'Quick Doodle',
        subtitle: 'Draw something cool',
        duration: 60,
        instructions: 'You have 60 seconds to draw a masterpiece. Let your creativity flow!',
        shareText: 'Check out my quick doodle!',
        noveltyCost: 2,
        skillXpAward: { 'creativity': 30 },
        analyticsEvents: ['creation_started', 'creation_completed'],
    },
    {
        id: 'rm_1_v2',
        category: ExperienceCategory.RelaxMode,
        title: 'Deep Breaths',
        subtitle: 'Just chill',
        duration: 60,
        instructions: 'Follow the on-screen guide. Inhale as the orb expands, hold, and exhale as it contracts. Repeat for one minute.',
        shareText: 'Took a minute to just breathe. Highly recommend it.',
        noveltyCost: 0,
        skillXpAward: { 'mindfulness': 25 },
        analyticsEvents: ['relax_started', 'relax_completed'],
    },
    {
        id: 'mch_boredom_1',
        category: ExperienceCategory.MicroChallenge,
        title: 'Boredom Tolerance',
        subtitle: 'The "Just Be" Challenge',
        duration: 60,
        challenge: 'Sit still for 60 seconds without any digital input. Just observe your thoughts.',
        instructions: "Find a comfortable seated position. Start the timer, close your eyes, and simply notice your thoughts and feelings without judgment. Don't check your phone or do anything else. When the timer is done, confirm you completed it.",
        shareText: 'I practiced sitting with my thoughts for a full minute.',
        noveltyCost: 0,
        skillXpAward: { 'mindfulness': 30, 'discipline': 10 },
        analyticsEvents: ['challenge_started', 'challenge_completed'],
    },
    {
        id: 'sd_1_v2',
        category: ExperienceCategory.SocialDuel,
        title: 'Trivia Battle',
        subtitle: 'vs a random opponent',
        duration: 20,
        instructions: 'Answer the trivia question faster than your opponent.',
        question: 'What is the capital of France?',
        options: ['Berlin', 'Paris'],
        correctOption: 1,
        shareText: 'I won a Trivia Battle!',
        noveltyCost: 1,
        skillXpAward: { 'knowledge': 15 },
        analyticsEvents: ['duel_started', 'duel_completed'],
    },
    {
        id: 'cb_1_v2',
        category: ExperienceCategory.CuriosityBites,
        title: 'Space Facts',
        subtitle: 'Learn about the cosmos',
        duration: 30,
        instructions: 'Read these amazing facts about space. Press the audio button to have them read to you.',
        shareText: 'Did you know a day on Venus is longer than a year on Venus?',
        facts: [
            "A day on Venus is longer than a year on Venus.",
            "There's a planet made of diamonds twice the size of Earth.",
            "The sunset on Mars appears blue."
        ],
        noveltyCost: 0,
        skillXpAward: { 'knowledge': 20 },
        analyticsEvents: ['curiosity_started', 'curiosity_completed'],
    },
    {
        id: 'kp_1_v2',
        category: ExperienceCategory.KinaestheticPlay,
        title: 'Mirror Me',
        subtitle: 'Move your body',
        duration: 30,
        instructions: 'The camera will turn on. Try to mirror the pose you see on screen as best you can! This is just for fun, there is no scoring.',
        shareText: 'I tried the Mirror Me challenge!',
        noveltyCost: 1,
        skillXpAward: { 'wellness': 15, 'coordination': 10 },
        analyticsEvents: ['kinaesthetic_started', 'kinaesthetic_completed'],
    },
     // FIX: Re-categorized 'Hum a Tune' back to VocalPlay after updating the type,
    // resolving the previous type error. This better aligns data with its domain.
    {
        id: 'vpl_1_v2',
        category: ExperienceCategory.VocalPlay,
        title: 'Hum a Tune',
        subtitle: 'Guess the song from your hum',
        duration: 45,
        instructions: 'You will be given a famous song title. Hum the melody into your microphone. Our AI will try to guess it!',
        shareText: 'I hummed a tune and the AI guessed it!',
        challenge: 'Hum the melody for "Twinkle Twinkle Little Star"',
        noveltyCost: 1,
        skillXpAward: { creativity: 10, rhythm: 15 },
        analyticsEvents: ['vocal_play_started', 'vocal_play_completed'],
    },
    {
        id: 'mch_1_v2',
        category: ExperienceCategory.MicroChallenge,
        title: 'Stand Up & Stretch',
        subtitle: 'A healthy break',
        duration: 30,
        challenge: 'Stand up and do a 30-second stretch.',
        instructions: 'Take a quick break from your screen. Stand up, reach for the sky, and stretch your body. You deserve it!',
        shareText: 'I just completed the Stand Up & Stretch challenge. Feeling refreshed!',
        noveltyCost: 0,
        skillXpAward: { 'wellness': 20, 'discipline': 5 },
        analyticsEvents: ['challenge_started', 'challenge_completed'],
    },
    {
        id: 'ql_1_v2',
        category: ExperienceCategory.QuickLaughs,
        title: 'Dad Joke Challenge',
        subtitle: 'Try not to groan',
        duration: 20,
        instructions: 'Read this dad joke out loud and try to keep a straight face!',
        shareText: 'I survived a dad joke!',
        challenge: 'Why don’t scientists trust atoms? Because they make up everything!',
        noveltyCost: 0,
        skillXpAward: { 'humor': 10 },
        analyticsEvents: ['laughs_started', 'laughs_completed'],
    }
];