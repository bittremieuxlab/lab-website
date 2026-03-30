import { useState, useEffect } from 'preact/hooks';

const isDev = import.meta.env.DEV;
const pagefindPath = isDev ? '../../../dist/pagefind/pagefind.js' : '/pagefind/pagefind.js';

type Result = {
  url: string;
  meta: { title?: string };
  excerpt: string;
};

type Filters = Record<string, Record<string, number>>;
type EnabledFilters = Record<string, string[]>;

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [enabled, setEnabled] = useState<EnabledFilters>({});

  // read ?q= from URL and load pagefind filters once
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q') ?? '';
    if (q) setQuery(q);

    (async () => {
      const pf = await import(/* @vite-ignore */ pagefindPath);
      await pf.init();
      setFilters(await pf.filters());
    })();
  }, []);

  // re-run search when query or active filters change
  useEffect(() => {
    (async () => {
      const pf = await import(/* @vite-ignore */ pagefindPath);
      const activeFilters = Object.fromEntries(
        Object.entries(enabled).filter(([, vals]) => vals.length > 0)
      );
      const res = await pf.search(query || null, { filters: activeFilters });
      const data: Result[] = await Promise.all(res.results.map((r: any) => r.data()));
      setResults(data);
    })();
  }, [query, enabled]);

  function toggleFilter(group: string, value: string) {
    setEnabled((prev) => {
      const current = prev[group] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [group]: next };
    });
  }

  return (
    <div>
      <input
        type="search"
        value={query}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
        placeholder="Search…"
        class="form-control mb-4"
      />

      {Object.entries(filters).map(([group, valueMap]) => (
        <fieldset key={group} class="mb-3">
          <legend class="h6 text-uppercase text-muted small">{group}</legend>
          <div class="d-flex flex-wrap gap-2">
            {Object.entries(valueMap).map(([value, count]) => {
              const active = (enabled[group] ?? []).includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  class={`btn btn-sm ${active ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => toggleFilter(group, value)}
                >
                  {value} <span class="badge bg-secondary ms-1">{count}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      {(query || Object.values(enabled).some((v) => v.length > 0)) && (
        <ul class="list-unstyled mt-4">
          {results.length === 0 && <li class="text-muted">No results.</li>}
          {results.map((r) => (
            <li key={r.url} class="mb-3 pb-3 border-bottom">
              <a href={r.url} class="fw-semibold">
                {r.meta.title ?? r.url}
              </a>
              <p
                class="small text-muted mb-0 mt-1"
                dangerouslySetInnerHTML={{ __html: r.excerpt }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
