---
title: 'Generative Transformer Architectures for Tree-Branched Sugar Structures'
type: 'master'
topics: ['glycomics', 'deep learning', 'transformers', 'graph generation', 'bioinformatics']
status: 'available'
---

Every cell in your body is coated in sugars — not table sugar, but complex branched polymers called
glycans that act as molecular barcodes for immune recognition, viral entry, and cancer progression.
Unlike DNA or proteins, which are linear chains, glycans are **trees**: a single sugar unit can bond
to multiple "children", producing branched structures that don't fit the sequence-in, sequence-out
paradigm that modern deep learning excels at.

Recent generative models like GlycoBART use seq2seq transformers to produce glycan structures from
mass spectra, and benchmarks like GlycanML have standardized evaluation for glycan property
prediction. But all generative transformers share an unsolved problem: to feed a tree into a
transformer, you flatten it into a sequence, which means picking an arbitrary order for "sibling"
branches. Two linearizations that differ only in branch order represent the same molecule but look
like different sequences to the model.

How to best design generative transformer models for tree generation — models that are invariant to
this tree ordering — is a fundamental open question in computer science, one that this thesis will
tackle using glycan structures as the main playing field. Possible avenues include designing
tree-path positional encodings, relative tree-distance attention biases, and architectures that
predict sibling sets at each branching point.

The student will work with real glycan datasets and implement custom transformer variants, ultimately
aiming to contribute to the forefront of this fast-moving field.
