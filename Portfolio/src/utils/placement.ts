export const GROUND_Y = 0

export function groundPosition([x, _y, z]: [number, number, number], y: number = GROUND_Y) {
  return [x, y, z] as [number, number, number]
}
