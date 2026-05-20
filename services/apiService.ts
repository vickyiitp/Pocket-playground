import type { MicroExperience } from '../types';
import { INITIAL_EXPERIENCES } from '../constants';

// Function to generate a unique ID
const generateId = () => `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// This function simulates an API call to fetch more experiences.
// In a real application, this would be a network request to your backend.
export const fetchMoreExperiences = (): Promise<MicroExperience[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      // Create new experiences by shuffling and assigning new IDs to the initial set
      const newExperiences = [...INITIAL_EXPERIENCES]
        .sort(() => 0.5 - Math.random())
        .map(exp => ({ ...exp, id: generateId() }));
      resolve(newExperiences);
    }, 1000); // Simulate network latency
  });
};