// @lovable.dev/vite-tanstack-config já inclui o seguinte — NÃO adicione manualmente
// ou o aplicativo apresentará problemas com plugins duplicados:
// - TanStack devtools (somente para desenvolvimento, primeiro), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
// nitro (somente para compilação usando cloudflare como alvo padrão), injeção de variáveis de ambiente VITE_*, alias de caminho @,
// Plugins de deduplicação React/TanStack, registro de erros e detecção de sandbox (porta/host/strictPort).

// Você pode passar configurações adicionais via defineConfig({ vite: { ... }, etc... }) se necessário.

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redireciona a entrada do servidor incluída no TanStack Start para src/server.ts (nosso wrapper de erro SSR).
    // nitro/vite compila a partir daqui
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      tsconfigPaths: true,
    },
  },
});
