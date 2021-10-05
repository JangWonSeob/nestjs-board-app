import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoradStatus } from './boards-status.enum';
import { BoardRepository } from './borads.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBords(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoradById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Board whit id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`Can't find Board with ${id}`);
    }
    console.log('success delete board');
  }

  async updateBoardStatus(id: number, status: BoradStatus): Promise<Board> {
    const board = await this.getBoradById(id);
    console.log(status);
    board.status = status;
    console.log(board);
    await this.boardRepository.save(board);

    return board;
  }
}
