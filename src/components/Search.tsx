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

// Match /publications, /publications/, /publications#..., /publications/#...
function isPublicationsResult(url: string) {
  return /^\/publications(\/|#|$)/.test(url);
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [enabled, setEnabled] = useState<EnabledFilters>({});
  const [pubsOnly, setPubsOnly] = useState(false);

  // Read ?q= from URL and load pagefind filters once
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q') ?? '';
    if (q) setQuery(q);

    (async () => {
      const pf = await import(/* @vite-ignore */ pagefindPath);
      await pf.init();
      const allFilters = await pf.filters();
      // Hide 'section' from UI — used internally
      const visibleFilters = Object.fromEntries(
        Object.entries(allFilters as Filters).filter(([key]) => key !== 'section')
      );
      setFilters(visibleFilters);
    })();
  }, []);

  // Re-run search when query, active filters, or mode changes
  useEffect(() => {
    (async () => {
      const pf = await import(/* @vite-ignore */ pagefindPath);
      const activeFilters = Object.fromEntries(
        Object.entries(enabled).filter(([, vals]) => vals.length > 0)
      );
      const res = await pf.search(query || null, { filters: activeFilters });
      const rawData: any[] = await Promise.all(res.results.map((r: any) => r.data()));

      // Expand publication page sub_results into individual items
      const seen = new Set<string>();
      const expanded: Result[] = [];

      for (const r of rawData) {
        if (r.sub_results?.length && isPublicationsResult(r.url)) {
          for (const sub of r.sub_results) {
            if (!seen.has(sub.url)) {
              seen.add(sub.url);
              expanded.push({ url: sub.url, meta: { title: sub.title }, excerpt: sub.excerpt });
            }
          }
        } else if (!seen.has(r.url)) {
          seen.add(r.url);
          expanded.push(r);
        }
      }

      // Publications-only mode: keep only results from the publications page
      setResults(pubsOnly ? expanded.filter((r) => isPublicationsResult(r.url)) : expanded);
    })();
  }, [query, enabled, pubsOnly]);

  function toggleFilter(group: string, value: string) {
    setEnabled((prev) => {
      const current = prev[group] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [group]: next };
    });
  }

  const hasActiveSearch = query || pubsOnly || Object.values(enabled).some((v) => v.length > 0);

  return (
    <div>
      <div class="btn-group mb-3" role="group" aria-label="Search mode">
        <button
          type="button"
          class={`btn btn-sm ${!pubsOnly ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => {
            setPubsOnly(false);
            setEnabled({});
          }}
        >
          All Content
        </button>
        <button
          type="button"
          class={`btn btn-sm ${pubsOnly ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setPubsOnly(true)}
        >
          Publications
        </button>
      </div>

      <input
        type="search"
        value={query}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
        placeholder="Search…"
        class="form-control mb-3"
      />

      {!pubsOnly &&
        Object.entries(filters).map(([group, valueMap]) => (
          <fieldset key={group} class="mb-3 border-0 p-0">
            <legend class="h6 text-uppercase text-muted small mb-1">{group}</legend>
            <div class="d-flex flex-wrap gap-1">
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

      {hasActiveSearch && (
        <ul class="list-unstyled mt-4">
          {results.length === 0 && <li class="text-muted">No results.</li>}
          {results.map((r) => (
            <li key={r.url} class="mb-3 pb-3 border-bottom">
              <a href={r.url} class="fw-semibold">
                {isPublicationsResult(r.url) && (
                  <i class="bi bi-journal-text me-1 text-muted small" title="Publication" />
                )}
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
