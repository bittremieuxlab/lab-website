import { useState, useRef } from 'preact/hooks';

type Publication = {
  id: string;
  type: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  url: string;
  abstract: string;
  note: string;
};

type Props = {
  publications: Publication[];
  showFilters: Boolean;
  pageLinks?: boolean;
};

const AUTHOR_COLLAPSE_THRESHOLD = 10;

function CollapsibleAuthors({ authors }: { authors: string }) {
  const [expanded, setExpanded] = useState(false);
  const names = authors.split(', ');
  if (names.length <= AUTHOR_COLLAPSE_THRESHOLD) return <span>{authors}</span>;
  return (
    <span>
      {expanded ? authors : `${names.slice(0, AUTHOR_COLLAPSE_THRESHOLD).join(', ')}`}
      {!expanded ? (
        <button
          class="btn btn-link btn-sm p-0 ms-1 align-baseline text-muted"
          style="font-size:inherit"
          onClick={() => setExpanded(true)}
        >
          et al.
        </button>
      ) : (
        <button
          class="btn btn-link btn-sm p-0 ms-1 align-baseline text-muted"
          style="font-size:inherit"
          onClick={() => setExpanded(false)}
        >
          show less
        </button>
      )}
    </span>
  );
}

export default function PublicationList({ publications, showFilters, pageLinks }: Props) {
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const lastClickedYear = useRef<number | null>(null);

  const years = [...new Set(publications.map((p) => p.year).filter((y) => y > 0))].sort(
    (a, b) => b - a
  );

  function toggleYear(year: number, shiftKey: boolean) {
    if (shiftKey && lastClickedYear.current !== null) {
      const min = Math.min(year, lastClickedYear.current);
      const max = Math.max(year, lastClickedYear.current);
      const rangeYears = years.filter((y) => y >= min && y <= max);
      setSelectedYears((prev) => [...new Set([...prev, ...rangeYears])]);
    } else {
      setSelectedYears((prev) =>
        prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
      );
    }
    lastClickedYear.current = year;
  }

  const filtered =
    selectedYears.length > 0
      ? publications.filter((p) => selectedYears.includes(p.year))
      : publications;

  // Group filtered publications by year for section headers
  const pubsByYear = filtered.reduce(
    (acc, pub) => {
      const yr = pub.year || 0;
      if (!acc[yr]) acc[yr] = [];
      acc[yr].push(pub);
      return acc;
    },
    {} as Record<number, Publication[]>
  );
  const displayYears = Object.keys(pubsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      {showFilters && years.length > 0 && (
        <div class="d-flex align-items-center gap-2 flex-wrap mb-4">
          <span class="text-muted small fw-semibold text-uppercase" style="min-width:3rem">
            Year
          </span>
          <div class="d-flex flex-wrap gap-1">
            {years.map((year) => (
              <button
                key={year}
                class={`btn btn-sm ${selectedYears.includes(year) ? 'btn-secondary' : 'btn-outline-secondary'}`}
                onClick={(e) => toggleYear(year, e.shiftKey)}
              >
                {year}
              </button>
            ))}
          </div>
          {selectedYears.length > 0 && (
            <button class="btn btn-sm btn-link text-muted p-0" onClick={() => setSelectedYears([])}>
              Clear
            </button>
          )}
        </div>
      )}

      {displayYears.length === 0 ? (
        <p class="text-muted">No publications match the selected years.</p>
      ) : (
        displayYears.map((year) => (
          <section key={year}>
            <h3
              class="h6 fw-bold text-muted text-uppercase border-bottom pb-2 mb-3 mt-4"
              id={`year-${year}`}
            >
              {year || 'Unknown'}
            </h3>
            <ul class="publication-list list-unstyled mb-0">
              {pubsByYear[year].map((pub) => (
                <li key={pub.id} id={pub.id} class="mt-2 pb-2">
                  <div class="lh-sm mb-1">
                    {pageLinks ? (
                      <a href={`/publications#${pub.id}`} class="fw-semibold">
                        {pub.title}
                      </a>
                    ) : pub.url ? (
                      <a href={pub.url} target="_blank" rel="noopener" class="fw-semibold">
                        {pub.title}
                      </a>
                    ) : (
                      <span class="fw-semibold">{pub.title}</span>
                    )}
                    {pub.note && <span class="badge bg-secondary mx-2">{pub.note}</span>}
                  </div>
                  <div class="text-muted small lh-sm">
                    <CollapsibleAuthors authors={pub.authors} />
                    {pub.authors && (pub.venue || pub.year) ? ' · ' : ''}
                    <em>{pub.venue}</em>
                    {pub.venue && pub.year ? ', ' : ''}
                    {pub.year || ''}
                  </div>
                  {/* {pub.abstract && (
                    <details>
                      <summary class="small text-muted" style="cursor:pointer">
                        Abstract
                      </summary>
                      <p class="small mt-1 mb-0">{pub.abstract}</p>
                    </details>
                  )} */}
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
