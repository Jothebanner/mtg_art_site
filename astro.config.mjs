import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs(), lit()],
});