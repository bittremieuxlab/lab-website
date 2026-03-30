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
};

export default function PublicationList({ publications, showFilters }: Props) {
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

      {filtered.length === 0 ? (
        <p class="text-muted">No publications match the selected years.</p>
      ) : (
        <ul class="list-unstyled">
          {filtered.map((pub) => (
            <li key={pub.id} class="mb-4 pb-4 border-bottom">
              <div class="mb-1">
                {pub.note && <span class="badge bg-secondary me-1">{pub.note}</span>}
              </div>
              <h5 class="mb-1">
                {pub.url ? (
                  <a href={pub.url} target="_blank" rel="noopener">
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </h5>
              <div class="text-muted small mb-1">{pub.authors}</div>
              <div class="text-muted small mb-2">
                <em>{pub.venue}</em>
                {pub.venue && pub.year ? ', ' : ''}
                {pub.year || ''}
              </div>
              {pub.abstract && (
                <details class="mb-2">
                  <summary class="small text-muted" style="cursor:pointer">
                    Abstract
                  </summary>
                  <p class="small mt-1">{pub.abstract}</p>
                </details>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
