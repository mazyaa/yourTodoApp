import { atom } from 'jotai';
import { createStore } from 'jotai';

export const store = createStore();
export const accessTokenAtom = atom(null);
export const expiredAtom = atom(null);