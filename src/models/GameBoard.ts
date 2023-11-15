// src/models/GameBoard.ts

// Define what a tile's data will look like
export interface Tile {
  pieceType: string; // Or an enum if you have specific types of pieces
  // You can add additional properties if needed, such as 'isSelected', 'isMatched', etc.
}

// Define the structure of the game board itself
export class GameBoard {
  private grid: Tile[][];

  constructor(rows: number, columns: number) {
    this.grid = this.initializeBoard(rows, columns);
  }

  // Initializes the board with random pieces
  private initializeBoard(rows: number, columns: number): Tile[][] {
    const board = new Array(rows);
    for (let i = 0; i < rows; i++) {
      board[i] = new Array(columns);
      for (let j = 0; j < columns; j++) {
        // Initialize each tile with a random piece type
        board[i][j] = this.createRandomTile();
      }
    }
    return board;
  }

  // Create a single random tile
  private createRandomTile(): Tile {
    const pieceTypes = ["A", "B", "C"]; // Example piece types
    const randomIndex = Math.floor(Math.random() * pieceTypes.length);
    return { pieceType: pieceTypes[randomIndex] };
  }

  // Public method to get a tile at a specific position
  public getTile(row: number, col: number): Tile | undefined {
    if (
      row >= 0 &&
      row < this.grid.length &&
      col >= 0 &&
      col < this.grid[row].length
    ) {
      return this.grid[row][col];
    }
    return undefined;
  }

  // Public method to set a tile at a specific position
  public setTile(row: number, col: number, tile: Tile): void {
    if (
      row >= 0 &&
      row < this.grid.length &&
      col >= 0 &&
      col < this.grid[row].length
    ) {
      this.grid[row][col] = tile;
    }
  }

  public getGrid(): Tile[][] {
    return this.grid;
  }
  // Add other methods here to handle moves, check for matches, etc.
}
