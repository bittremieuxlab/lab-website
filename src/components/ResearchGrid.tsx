import { useState } from 'preact/hooks';

type Research = {
  id: string;
  name: string;
  description: string;
  tags: string[];
};

type Props = {
  research: Research[];
  baseUrl: string;
};

export default function ResearchGrid({ research, baseUrl }: Props) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const tags = [...new Set(research.flatMap((r) => r.tags))].sort();

  const filtered =
    activeTags.length > 0
      ? research.filter((r) => activeTags.every((t) => r.tags.includes(t)))
      : research;

  function toggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  return (
    <div>
      {/* Tag filters */}
      {tags.length > 0 && (
        <div class="d-flex align-items-center gap-2 flex-wrap mb-4">
          <span class="text-muted small fw-semibold text-uppercase" style="min-width:3rem">
            Tags
          </span>
          <div class="d-flex flex-wrap gap-1">
            {tags.map((tag) => (
              <button
                key={tag}
                class={`btn btn-sm ${activeTags.includes(tag) ? 'btn-secondary' : 'btn-outline-secondary'}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          {activeTags.length > 0 && (
            <button class="btn btn-sm btn-link text-muted p-0" onClick={() => setActiveTags([])}>
              Clear
            </button>
          )}
        </div>
      )}

      {/* Cards */}
      {filtered.length === 0 ? (
        <p class="text-muted">No research items match the current filters.</p>
      ) : (
        <div class="d-flex flex-column gap-3">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={`${baseUrl}/${item.id}`}
              class="card text-decoration-none text-reset border-0 shadow-sm"
              style="transition: box-shadow 0.15s"
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow = '0 .5rem 1rem rgba(0,0,0,.15)')
              }
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = '')}
            >
              <div class="card-body">
                <h5 class="card-title mb-1">{item.name}</h5>
                <p class="card-text text-muted mb-2">{item.description}</p>
                {item.tags.length > 0 && (
                  <div class="d-flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
