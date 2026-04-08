---
# REQUIRED
name: 'Firstname Lastname'
email: 'firstname.lastname@uantwerpen.be'
role: 'PhD Student' # PhD Student | Software Engineer | MSc Student | Postdoc | Professor | PI
status: 'active' # active | alumni | collaborator
# team: group membership for filtering on the people page
team: ['Mass Spectrometry'] # Mass Spectrometry | Metabolomics
# tags: keywords shown on your card and used for filtering
tags: ['machine learning', 'mass spectrometry']

# OPTIONAL — omit any field you don't want shown
photo:
  'firstname-lastname.jpg' # Place the file in src/assets/profile-images/
  # Requirements: square crop, min 360×360 px, max 5 MB
  # Filename: lowercase, hyphen-separated
  # Supported formats: jpg, jpeg, png, webp, avif
  # The filename here must exactly match the file in src/assets/profile-images/ (including extension)
bio_short: 'One to three sentences describing your research focus.'
pronouns: 'pronouns string'

links:
  website: 'https://yourwebsite.com'
  github: 'https://github.com/username'
  scholar: 'https://scholar.google.com/citations?user=XXXXXXX'
  orcid: '0000-0000-0000-0000'
  linkedin: 'https://www.linkedin.com/in/username'

# selected_publications: citation keys from src/data/publications.bib
selected_publications:
  - 'citation-key-1'
  - 'citation-key-2'

education:
  - 'M.Sc. Bioinformatics, University of Antwerp, 2023'
  - 'B.Sc. Computer Science, KU Leuven, 2021'

awards:
  - 'Best Poster Award, HUPO 2024'

affiliation:
  - 'Collaborating University Name'

# For alumni: add the following field
# status: 'alumni'

# For collaborators from another institution: also add
# affiliation: 'Institution Name'
---

Write a longer bio here in Markdown (optional). This appears on the individual person page.
You can use **bold**, _italics_, lists, and other standard Markdown.
