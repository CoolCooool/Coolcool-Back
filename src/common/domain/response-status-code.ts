const ResponseStatusCode = {
  OK: 'OK',
  SERVER_ERROR: 'SERVER_ERROR',
  BAD_PARAMETER: 'BAD_PARAMETER',
} as const;
type ResponseStatusCode = (typeof ResponseStatusCode)[keyof typeof ResponseStatusCode];
