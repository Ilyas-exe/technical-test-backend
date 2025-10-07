import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Pour ne pas avoir à importer describe, it, expect, etc.
    environment: 'node',
  },
});