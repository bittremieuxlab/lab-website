---
title: 'Designing LLMs to Generate Molecules Through Order-Invariant Graph Generation'
type: 'master'
topics:
  [
    'drug discovery',
    'graph generation',
    'large language models',
    'deep learning',
    'cheminformatics',
  ]
status: 'available'
---

Molecules are graphs: atoms are nodes, bonds are edges. Generative AI for molecules is a hot area —
design a model that proposes new compounds and you accelerate drug discovery and materials science.
Driven by the innovation surrounding LLMs, autoregressive models ("predict the next element in the
sequence") are the dominant paradigm for generative AI. Molecular graphs, however, have no natural
"sequential" ordering. A popular workaround is SMILES, a string format that flattens molecular
graphs into text so the default LLM approach applies. While this seems to work in practice,
the problem of arbitrary linearization ordering remains. Graph diffusion models can avoid this, but
are comparatively more expensive to train and run inference with.

This thesis seeks the best of both worlds: design **autoregressive transformer models that are
naturally invariant to the ordering in which atoms are presented**. A simple paradigm is to let the
model choose which atom to generate next — requiring it to solve a graph matching problem (a
quadratic assignment problem) to find the best next node. Alternative routes to the same framework
will be experimented with, with the ultimate goal of evaluating how these ideas match up against
contemporary "molecule LLMs".

The student will work with molecular graph data, implement custom graph transformers, and combine
these with combinatorial optimization algorithms.
