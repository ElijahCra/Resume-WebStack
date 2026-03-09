import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('light');

	return {
		subscribe,
		setTheme: (newTheme: Theme) => {
			if (!browser) return;

			console.log('Setting theme to:', newTheme);

			localStorage.setItem('theme', newTheme);

			if (newTheme === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}

			set(newTheme);
		},
		toggle: () => {
			if (!browser) return;

			update(current => {
				const newTheme = current === 'light' ? 'dark' : 'light';

				localStorage.setItem('theme', newTheme);

				if (newTheme === 'dark') {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}

				return newTheme;
			});
		}
	};
}

export const theme = createThemeStore();
