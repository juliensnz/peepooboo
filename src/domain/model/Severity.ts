const SEVERITY_LEVELS = {
  debug: 0,
  info: 1,
  warning: 2,
  error: 3,
  fatal: 4,
};

type Severity = keyof typeof SEVERITY_LEVELS;

const isSeverity = (severity: string): severity is Severity => Object.keys(SEVERITY_LEVELS).includes(severity);

export type {Severity};
export {isSeverity, SEVERITY_LEVELS};
