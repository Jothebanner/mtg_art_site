import { createEffect, createSignal } from "solid-js"
import { useStore } from "@nanostores/solid";
import { persistentMap } from "@nanostores/persistent";
import { $settings } from "../stores/Settings.js";

const ThemeToggle = () =>
{
    const [theme, setTheme] = createSignal('');

    $settings.subscribe(() => {
        setTheme($settings.get().theme);
    });

    createEffect(() => {
        if (theme() === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches || theme() === 'dark')
        {
            document.documentElement.classList.add('dark');
        }
        else 
        {
            document.documentElement.classList.remove('dark');
        }
    });
    
    return ( 
        <div class="inline-flex justify-center">
            <label onclick={() => {$settings.setKey('theme', 'light'); console.log("Toggled Light")}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="dark:fill-slate-600 fill-yellow-400">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                </svg>
             {/* <input type="radio" name="theme-toggle" title="Use light theme" aria-label="Use light theme" value="light">  */}
            </label>
            <label onclick={() => {$settings.setKey('theme', 'dark'); console.log("Toggled Dark")}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="fill-slate-600 dark:fill-blue-300">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
            </label>
        </div>
    );
}

export default ThemeToggle;


// const 


// <script>

// </script>