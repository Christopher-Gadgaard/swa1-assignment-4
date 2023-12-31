// models/GameLogic.ts

import { gameService } from "@/services/gameService";
import { Tile, TilePosition, TileType } from "@/types/types";

export class GameLogic {
  private board: Tile[][];
  private score: number;
  private static readonly tileTypes: TileType[] = ['astronaut' , 'brain-slug' , 'galaxy' , 'laser-gun', 'millennium-falcon' , 'saturn' ];
  private movesMade: number = 0;
  private moveLimit: number = 5;
  private gameId?: number;
  private user?: number;

  constructor(public width: number = 8, public height: number = 8, private token: string) {
    this.board = this.createInitialBoard();
    this.score = 0;
  }

  public async initializeGame() {
    try {
      const newGame = await gameService.startNewGame(this.token);
      this.gameId = newGame.id; 
      this.user = newGame.user;
      console.log("New game started:", newGame);
    } catch (error) {
      console.error("Error starting a new game:", error);
      throw error;
    }
  }
  
  

  private createInitialBoard(): Tile[][] {
    let board: Tile[][] = [];
    for (let x = 0; x < this.height; x++) {
      let currentRow: Tile[] = [];
      for (let y = 0; y < this.width; y++) {
        let newTile: Tile;
        do {
          newTile = this.createRandomTile();
        } while (this.checkForPotentialMatch(board, currentRow, x, y, newTile.type));
        currentRow.push(newTile);
      }
      board.push(currentRow);
    }
    return board;
  }

  private checkForPotentialMatch(board: Tile[][], currentRow: Tile[], x: number, y: number, newTileType: TileType): boolean {
    // Logic to check for potential matches (horizontal and vertical)
    if (y >= 2 && currentRow[y - 1].type === newTileType && currentRow[y - 2].type === newTileType) {
      return true;
    }
    if (x >= 2 && board[x - 1][y].type === newTileType && board[x - 2][y].type === newTileType) {
      return true;
    }
    return false;
  }

  private createRandomTile(): Tile {
    const randomIndex = Math.floor(Math.random() * GameLogic.tileTypes.length);
    return { type: GameLogic.tileTypes[randomIndex] as TileType };
  }

  public async performSwap(firstTile: TilePosition, secondTile: TilePosition): Promise<void> {
    const temp = this.board[firstTile.row][firstTile.col];
    this.board[firstTile.row][firstTile.col] = this.board[secondTile.row][secondTile.col];
    this.board[secondTile.row][secondTile.col] = temp;

    this.movesMade++;
    if (this.movesMade >= this.moveLimit) {
      this.endGame();
    }
  }

  

  private endGame(): void {
    // Logic to handle end of the game, like dispatching an event
  }

  public getRemainingMoves(): number {
    return this.moveLimit - this.movesMade;
  }

  private findMatches(): Array<TilePosition> {
    let matches: Array<TilePosition> = [];
    matches = matches.concat(this.findHorizontalMatches());
    matches = matches.concat(this.findVerticalMatches());
    return matches;
  }

  private findHorizontalMatches(): Array<TilePosition> {
    let matches: Array<TilePosition> = [];

    for (let x = 0; x < this.board.length; x++) {
      let y = 0;
      while (y < this.board[x].length - 2) {
        if (this.board[x][y].type !== 'empty' && 
            this.board[x][y].type === this.board[x][y + 1].type && 
            this.board[x][y].type === this.board[x][y + 2].type) {
          let matchStart = y;
          while (y < this.board[x].length && this.board[x][matchStart].type === this.board[x][y].type) {
            matches.push({ row: x, col: y }); // Corrected line
            y++;
          }
        } else {
          y++;
        }
      }
    }
    return matches;
  }

  private findVerticalMatches(): Array<TilePosition> {
    let matches: Array<TilePosition> = [];

    for (let y = 0; y < this.board[0].length; y++) {
      let x = 0;
      while (x < this.board.length - 2) {
        if (this.board[x][y].type !== 'empty' && 
            this.board[x][y].type === this.board[x + 1][y].type && 
            this.board[x][y].type === this.board[x + 2][y].type) {
          let matchStart = x;
          while (x < this.board.length && this.board[matchStart][y].type === this.board[x][y].type) {
            matches.push({ row: x, col: y }); // Corrected line
            x++;
          }
        } else {
          x++;
        }
      }
    }
    return matches;
  }

  private expandMatches(matches: Array<TilePosition>): Array<TilePosition> {
    let expandedMatches = new Set<string>(matches.map(match => JSON.stringify(match)));

    const checkAndAddMatch = (x: number, y: number, type: TileType) => {
      if (x >= 0 && x < this.height && y >= 0 && y < this.width && this.board[x][y].type === type) {
        const matchString = JSON.stringify({ row: x, col: y });
        if (!expandedMatches.has(matchString)) {
          expandedMatches.add(matchString);
          expandFromTile(x, y, type);
        }
      }
    };

    const expandFromTile = (x: number, y: number, type: TileType) => {
      checkAndAddMatch(x - 1, y, type); // Up
      checkAndAddMatch(x + 1, y, type); // Down
      checkAndAddMatch(x, y - 1, type); // Left
      checkAndAddMatch(x, y + 1, type); // Right
    };

    matches.forEach(match => expandFromTile(match.row, match.col, this.board[match.row][match.col].type));

    // Convert the Set back to an array of TilePositions
    return Array.from(expandedMatches).map(matchString => JSON.parse(matchString));
  }

  public processMatches(): void {
    let matches = this.findMatches();
  
    while (matches.length > 0) {
      matches = this.expandMatches(matches); // Expand matches before removing them
      this.removeMatches(matches);
      this.collapseBoard();
      this.refillBoard();
      this.score += matches.length * 10; 
  
      matches = this.findMatches();
    }

    this.updateServerState();
  }
  
  private async updateServerState() {
    if (this.gameId !== undefined) {
      try {
        console.log("Updating game:", this.gameId, this.token, { score: this.score, user: this.user });
        const updatedGame = await gameService.updateGame(this.gameId, this.token, { user: this.user, score: this.score,  });
        console.log("Game updated:", updatedGame);
      } catch (error) {
        console.error("Error updating the game:", error);
        // Handle error appropriately
      }
    } else {
      console.error("Error: gameId is not set");
    }
  }

  private removeMatches(matches: Array<TilePosition>): void {
    // Logic to mark matched tiles as empty
    for (let match of matches) {
      this.board[match.row][match.col].type = 'empty' as TileType;
    }
  }

  private collapseBoard(): void {
    // Logic to let tiles fall down and fill empty spaces
    for (let col = 0; col < this.width; col++) {
      for (let row = this.height - 1; row >= 0; row--) {
        if (this.board[row][col].type === 'empty') {
          for (let aboveRow = row - 1; aboveRow >= 0; aboveRow--) {
            if (this.board[aboveRow][col].type !== 'empty') {
              this.board[row][col] = this.board[aboveRow][col];
              this.board[aboveRow][col] = { type: 'empty' as TileType };
              break;
            }
          }
        }
      }
    }
  }

  private refillBoard(): void {
    // Logic to refill the board with new tiles
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.board[row][col].type === 'empty') {
          this.board[row][col] = this.createRandomTile();
        }
      }
    }
  }

  public simulateSwap(firstTile: TilePosition, secondTile: TilePosition): boolean {
     // Check if tiles are in the same row or column
  const isInSameRowOrColumn = firstTile.row === secondTile.row || firstTile.col === secondTile.col;

  if (!isInSameRowOrColumn) {
    return false;
  }
  
    // Temporarily swap tiles for simulation
    this.performSwap(firstTile, secondTile);
  
    const hasMatch = this.findMatches().length > 0;
  
    // Swap back to original state
    this.performSwap(firstTile, secondTile);
  
    // Do not count this as a valid move
    this.movesMade--;
    this.movesMade--;
  
    return hasMatch;
  }
  

  public getBoard(): Tile[][] {
    return this.board;
  }

  public getScore(): number {
    return this.score;
  }
}
