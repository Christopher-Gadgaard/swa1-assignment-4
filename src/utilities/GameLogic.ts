// src/utilities/GameLogic.ts

import { GameBoard, Tile } from "../models/GameBoard";
import { Game } from "../models/Game";

export class GameLogic {
  private board: GameBoard;
  private state: Game;

  constructor(board: GameBoard, state: Game) {
    this.board = board;
    this.state = state;
  }

  // Check if a move is legal (tiles are adjacent and result in a match)
  public isMoveLegal(
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ): boolean {
    // Add logic to determine if the move is legal
    // For now, let's just return true as a placeholder
    return true;
  }

  // Swap two tiles on the board
  public swapTiles(
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ): void {
    const fromTile = this.board.getTile(fromRow, fromCol);
    const toTile = this.board.getTile(toRow, toCol);

    if (fromTile && toTile) {
      this.board.setTile(fromRow, fromCol, toTile);
      this.board.setTile(toRow, toCol, fromTile);
    }
  }

  // Find all matches on the board
  public findMatches(): Tile[][] {
    // Implement logic to find matches
    // For now, return an empty array as a placeholder
    return [];
  }

  // Remove matched tiles and refill the board
  public removeAndRefillMatches(matches: Tile[][]): void {
    // Implement logic to remove matches and refill the board
  }

  // Perform a move, including swapping tiles, finding/removing matches, and refilling
  public makeMove(
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ): boolean {
    if (!this.isMoveLegal(fromRow, fromCol, toRow, toCol)) {
      return false; // Move was not legal
    }

    // Swap the tiles
    this.swapTiles(fromRow, fromCol, toRow, toCol);

    // Find and process matches
    const matches = this.findMatches();
    if (matches.length > 0) {
      this.removeAndRefillMatches(matches);
      // Update the game state, e.g., increment score
      this.state.score += matches.length; // This is just a placeholder calculation
    }

    return true; // Move was successful
  }
}

// You can export instances or factory functions to create instances of GameLogic
