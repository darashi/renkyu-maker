import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://darashi.github.io",
  base: "/renkyu-maker",

  integrations: [tailwind()],
});
