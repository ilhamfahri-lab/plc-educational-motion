// Single source of truth for the "What Is a PLC?" visual system.
// Color semantics are fixed across ALL scenes:
//   input = blue, logic/PLC = teal, output = orange, alert = red.

export const Canvas = {width: 1920, height: 1080} as const;

export const Colors = {
  background: '#0F172A',
  surface: '#1E293B',
  surfaceAlt: '#334155',
  grid: '#1E293B',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  input: '#38BDF8',
  logic: '#2DD4BF',
  output: '#FB923C',
  alert: '#F87171',
} as const;

export type IOKind = 'input' | 'logic' | 'output';

export const KindColors: Record<IOKind, string> = {
  input: Colors.input,
  logic: Colors.logic,
  output: Colors.output,
};

// Fallback stacks so the project renders even before custom fonts are loaded.
export const Fonts = {
  heading: 'Inter, Helvetica, Arial, sans-serif',
  mono: '"JetBrains Mono", Menlo, Consolas, monospace',
} as const;

// Animation durations in seconds.
export const Timing = {
  fast: 0.4,
  base: 0.6,
  slow: 1.0,
} as const;
