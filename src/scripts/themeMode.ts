import 'bootstrap/dist/js/bootstrap';

const modeIcons: Record<string, string> = {
  light: '<i class="bi bi-sun-fill"></i>',
  dark: '<i class="bi bi-moon-fill"></i>',
  colorblind: '<i class="bi bi-eye"></i>',
};

export function applyMode(mode: string): void {
  if (mode === 'dark') {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('cbf');
  } else if (mode === 'colorblind') {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('cbf');
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.remove('cbf');
  }
}

export function initThemeModeDropdown(): void {
  const dropdownBtn = document.getElementById('theme-dropdown-btn');
  if (!dropdownBtn) return;

  const currentMode =
    localStorage.getItem('theme-mode') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const updateBtn = (mode: string) => {
    dropdownBtn.innerHTML = modeIcons[mode] ?? modeIcons.light;
    document.querySelectorAll<HTMLElement>('[data-theme-mode]').forEach((item) => {
      item.classList.toggle('active', item.dataset.themeMode === mode);
    });
  };

  updateBtn(currentMode);

  document.querySelectorAll<HTMLElement>('[data-theme-mode]').forEach((item) => {
    item.addEventListener('click', () => {
      const mode = item.dataset.themeMode!;
      localStorage.setItem('theme-mode', mode);
      applyMode(mode);
      updateBtn(mode);
    });
  });
}
