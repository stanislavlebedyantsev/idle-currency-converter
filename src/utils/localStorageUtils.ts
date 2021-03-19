import { IRootState } from '@/types/rootStateTypes';

export const loadFromStorage = (): IRootState | undefined => {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state: IRootState): undefined => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    return undefined;
  }
};
