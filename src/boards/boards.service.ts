import { Injectable } from '@nestjs/common';
import { Board, BoradStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoradStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  getBoradById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((boards) => boards.id !== id);
  }

  updateBoardStatus(id: string, status: BoradStatus): Board {
    const board = this.getBoradById(id);
    board.status = status;
    return board;
  }
}
