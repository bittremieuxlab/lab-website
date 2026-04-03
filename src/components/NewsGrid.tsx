type NewsItem = {
  id: string;
  title: string;
  date: string;
  description: string;
  url?: string;
};

type Props = {
  news: NewsItem[];
  baseUrl: string;
};

export default function NewsGrid({ news, baseUrl }: Props) {
  return (
    <div class="d-flex flex-column gap-3">
      {news.map((item) => {
        const href = item.url ?? `${baseUrl}/${item.id}`;
        return (
          <a
            key={item.id}
            href={href}
            class="card text-decoration-none text-reset border-0 shadow-sm"
            style="transition: box-shadow 0.15s"
            onMouseOver={(e) => (e.currentTarget.style.boxShadow = '0 .5rem 1rem rgba(0,0,0,.15)')}
            onMouseOut={(e) => (e.currentTarget.style.boxShadow = '')}
          >
            <div class="card-body">
              <p class="text-muted small mb-1">{item.date}</p>
              <h5 class="card-title mb-1">{item.title}</h5>
              <p class="card-text text-muted mb-0">{item.description}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
