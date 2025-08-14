"use client";

import * as React from "react";
import { useServerInsertedHTML } from "next/navigation";
import createCache, { EmotionCache, SerializedStyles } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

type InsertFn = EmotionCache["insert"];

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache({ key: "mui", prepend: true });
    cache.compat = true;

    const inserted: string[] = [];
    const originalInsert: InsertFn = cache.insert;

    // Fully typed override with no `any`
    cache.insert = function (
      selector: string,
      serialized: SerializedStyles,
      sheet: unknown,
      shouldCache: boolean
    ): string | void {
      if (!cache.inserted[serialized.name]) {
        inserted.push(serialized.name);
      }
      return originalInsert.call(cache, selector, serialized, sheet, shouldCache);
    };

    const flush = (): string[] => {
      const prev = [...inserted];
      inserted.length = 0;
      return prev;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;

    const insertedMap = cache.inserted as Record<string, string | true>;

    return (
      <style
        data-emotion={`mui ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: names.map((name) => insertedMap[name] as string).join(" "),
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
