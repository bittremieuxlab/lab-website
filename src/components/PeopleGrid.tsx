import { useState } from 'preact/hooks';
import PeopleCards from './PeopleCards';

type Person = {
  id: string;
  name: string;
  role: string;
  status: string;
  bio_short?: string;
  photo?: string;
  tags: string[];
};

type Props = {
  people: Person[];
  baseUrl: string;
};

export default function PeopleGrid({ people, baseUrl }: Props) {
  const [activeRole, setActiveRole] = useState<string | null>(null);

  const roles = [...new Set(people.map((p) => p.role))].sort();

  const filtered = people.filter((p) => {
    if (activeRole && p.role !== activeRole) return false;
    return true;
  });

  function reset() {
    setActiveRole(null);
  }

  const hasFilter = activeRole;

  return (
    <div>
      {/* Filters */}
      <div class="mb-4 d-flex flex-column gap-3">
        <div class="d-flex align-items-center gap-2 flex-wrap">
          <span class="text-muted small fw-semibold text-uppercase" style="min-width:3rem">
            Role
          </span>
          <div class="d-flex flex-wrap gap-1">
            {roles.map((role) => (
              <button
                key={role}
                class={`btn btn-sm ${activeRole === role ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveRole(activeRole === role ? null : role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {hasFilter && (
          <div>
            <button class="btn btn-sm btn-link text-muted p-0" onClick={reset}>
              Clear filters
            </button>
            <span class="text-muted small ms-2">
              {filtered.length} of {people.length} shown
            </span>
          </div>
        )}
      </div>

      {/* Card grids */}
      {filtered.length === 0 ? (
        <p class="text-muted">No people match the current filters.</p>
      ) : (
        <div>
          <h3 class="h6 fw-bold text-muted text-uppercase border-bottom pb-2 mb-3 mt-4">
            Active team
          </h3>
          <PeopleCards people={filtered.filter((p) => p.status !== 'alumni')} baseUrl={baseUrl} />
          <h3 class="h6 fw-bold text-muted text-uppercase border-bottom pb-2 mb-3 mt-4">Alumni</h3>
          <PeopleCards people={filtered.filter((p) => p.status === 'alumni')} baseUrl={baseUrl} />
        </div>
      )}
    </div>
  );
}
