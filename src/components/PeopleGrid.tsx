import { useState } from 'preact/hooks';

type Person = {
  id: string;
  name: string;
  role: string;
  status: string;
  bio_short?: string;
  photo?: string;
  tags: string[];
  teams: string[];
};

type Props = {
  people: Person[];
  baseUrl: string;
};

export default function PeopleGrid({ people, baseUrl }: Props) {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeTeams, setActiveTeams] = useState<string[]>([]);

  const roles = [...new Set(people.map((p) => p.role))].sort();
  const teams = [...new Set(people.flatMap((p) => p.teams))].sort();
  const tags = [...new Set(people.flatMap((p) => p.tags))].sort();

  const filtered = people.filter((p) => {
    if (activeRole && p.role !== activeRole) return false;
    if (activeTags.length > 0 && !activeTags.every((t) => p.tags.includes(t))) return false;
    if (activeTeams.length > 0 && !activeTeams.every((t) => p.teams.includes(t))) return false;
    return true;
  });

  function toggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function toggleTeam(team: string) {
    setActiveTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  }

  function reset() {
    setActiveRole(null);
    setActiveTags([]);
    setActiveTeams([]);
  }

  const hasFilter = activeRole || activeTags.length > 0 || activeTeams.length > 0;

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

        {teams.length > 0 && (
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <span class="text-muted small fw-semibold text-uppercase" style="min-width:3rem">
              Teams
            </span>
            <div class="d-flex flex-wrap gap-1">
              {teams.map((team) => (
                <button
                  key={team}
                  class={`btn btn-sm ${activeTeams.includes(team) ? 'btn-secondary' : 'btn-outline-secondary'}`}
                  onClick={() => toggleTeam(team)}
                >
                  {team}
                </button>
              ))}
            </div>
          </div>
        )}

        {tags.length > 0 && (
          <div class="d-flex align-items-center gap-2 flex-wrap">
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
          </div>
        )}

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

      {/* Card grid */}
      {filtered.length === 0 ? (
        <p class="text-muted">No people match the current filters.</p>
      ) : (
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
          {filtered.map((person) => (
            <div key={person.id} class="col">
              <a
                href={`${baseUrl}/${person.id}`}
                class="card h-100 text-decoration-none text-reset border-0 shadow-sm"
                style="transition: box-shadow 0.15s"
                onMouseOver={(e) =>
                  (e.currentTarget.style.boxShadow = '0 .5rem 1rem rgba(0,0,0,.15)')
                }
                onMouseOut={(e) => (e.currentTarget.style.boxShadow = '')}
              >
                <div class="card-img-top d-flex justify-content-center pt-4">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={`Photo of ${person.name}`}
                      class="rounded-circle object-fit-cover"
                      style="width:120px;height:120px"
                    />
                  ) : (
                    <div
                      class="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fs-2 fw-bold"
                      style="width:120px;height:120px"
                    >
                      {person.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div class="card-body text-center">
                  <h5 class="card-title mb-0">{person.name}</h5>
                  <p class="text-muted small mb-2">{person.role}</p>
                  {person.status === 'alumni' && (
                    <span class="badge bg-secondary mb-2">Alumni</span>
                  )}
                  {person.bio_short && (
                    <p
                      class="card-text small text-muted"
                      style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden"
                    >
                      {person.bio_short}
                    </p>
                  )}
                  {person.tags.length > 0 && (
                    <div class="d-flex flex-wrap gap-1 justify-content-center mt-2">
                      {person.tags.map((tag) => (
                        <span key={tag} class="badge bg-secondary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {person.status === 'collaborator' && (
                    <span class="badge bg-info m-2">External Collaborator</span>
                  )}
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
