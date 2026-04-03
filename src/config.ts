export const SITE = {
  //   website: 'https://scholar-lite-demo.netlify.app/', // Replace with your actual deployed URL
  //   author: 'Scholar-Lite Team',
  //   description: 'A lightweight, modern static website template for academic labs and scholars.',
  //   title: 'Scholar-Lite',
  //   ogImage: 'astropaper-og.jpg',
  lightAndDarkMode: true,
  //   postPerPage: 3,
  //   scheduledPostMargin: 15 * 60 * 1000, // 15 minutes

  // Lab Info
  labName: 'Bittremieux Lab',
  university: 'University of Antwerp',
  //   logo: '/assets/logo-real.svg', // Logo path
  //   avatar: '/assets/logo-real.svg', // Avatar for SEO/Schema
  //   email: 'contact@lab.edu', // Contact email for Join Us page

  // Home page
  heroTitle: 'Bioinformatics Research',
  heroSubtitle:
    'We develop algorithms and software tools to advance the analysis of mass spectrometry data for proteomics and metabolomics.',
  featuredPublications: ['cvpr2025transformer', 'gpt4', 'neurips2024diffusion'],
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
