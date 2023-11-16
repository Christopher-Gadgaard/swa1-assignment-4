// types/types.ts

export type TileType = 'astronaut' | 'brain-slug' | 'galaxy' | 'laser-gun'| 'millennium-falcon' | 'saturn' | 'empty';

export interface Tile {
  type: TileType;
}

export interface TilePosition {
  row: number;
  col: number;
}
