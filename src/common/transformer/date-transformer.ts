export function TransformDate(value: any) {
  if (value instanceof Date) {
    return value;
  }
  return new Date(value);
}
