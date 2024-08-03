import { defineConfig } from "vite";

export default defineConfig({
    root: "client",
    build: {
        target: "esnext",
        minify: "terser",
        outDir: "../dist/client",
        assetsDir: "_",
        emptyOutDir: true,
        sourcemap: true,
    },
    publicDir: "assets",
});
