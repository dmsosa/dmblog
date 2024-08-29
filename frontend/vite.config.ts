import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

//Using dotenv to access .env variables
//You can run a Docker container with a given BACKEND_URL, so that the frontEnd can connect to it
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.tsx",
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URL,
      },
    },
  },
  base: process.env.VITE_BASE,
});
