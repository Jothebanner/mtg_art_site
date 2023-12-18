import { atom } from 'nanostores';
import { persistentAtom, persistentMap } from '@nanostores/persistent';

// this kinda just feels right 
// yeah
export type SettingsValue = {
    theme: 'dark'| 'light' | 'auto',
}

export const beans = atom("auto");
export const tempVar = persistentAtom<string>("theme", 'auto');
export const settings = persistentMap<SettingsValue>('settings:', {
    theme: 'auto',
})
