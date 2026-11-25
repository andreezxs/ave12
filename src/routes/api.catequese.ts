import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchCatecheticalLibrary } from "@/lib/content";

export const Route = createFileRoute("/api/catequese")({
  server: {
    handlers: {
      GET: async () =>
        Response.json(
          { data: await fetchCatecheticalLibrary() },
          {
            headers: {
              "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
            },
          },
        ),
    },
  },
});
