let currId = -1;
export function genId(): string {
  return `id-${++currId}`;
}
