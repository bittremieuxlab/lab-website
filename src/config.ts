export const SITE = {
  //   website:
  //   author:
  //   description:
  //   title:
  //   ogImage:
  lightAndDarkMode: true,
  //   postPerPage:
  //   scheduledPostMargin:

  // Lab Info
  labName: 'Bittremieux Lab',
  university: 'University of Antwerp',
  //   logo: , // Logo path
  //   avatar: , // Avatar for SEO/Schema
  //   email: , // Contact email for Join Us page

  // Home page
  heroTitle: 'Bioinformatics Research',
  heroSubtitle:
    'We develop algorithms and software tools to advance the analysis of mass spectrometry data for proteomics and metabolomics.',
  featuredPublications: ['Yilmaz2022', 'Yilmaz2024', 'Bittremieux2025', 'Shaffer2022'],
};

export const navLinks = [
  { href: '/research', label: 'Research' },
  { href: '/people', label: 'People' },
  { href: '/publications', label: 'Publications' },
  { href: '/softwareTools', label: 'Software & Tools' },
  {
    label: 'Career',
    children: [
      { href: '/positions', label: 'Positions' },
      { href: '/thesis', label: 'Thesis' },
    ],
  },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];
