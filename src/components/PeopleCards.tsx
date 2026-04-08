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

export default function PeopleCards({ people, baseUrl }: Props) {
  if (people.length === 0) return null;
  return (
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
      {people.map((person) => (
        <div key={person.id} class="col">
          <a
            href={`${baseUrl}/${person.id}`}
            class="card h-100 text-decoration-none text-reset border-0 shadow-sm"
            style="transition: box-shadow 0.15s"
            onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 .5rem 1rem rgba(0,0,0,.15)')}
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
              {/* {person.bio_short && (
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
              )} */}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
