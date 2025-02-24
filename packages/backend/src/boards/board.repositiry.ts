import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Board } from "@/boards/board.entity";
import { BoardStatus } from "@/boards/board-status.enum";
import type { CreateBoardDto } from "@/boards/dto/create-board.dto";
import type { User } from "@/auth/user.entity";

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async getAllBoards() {
    return this.find();
  }

  async createBoard(dto: CreateBoardDto, user: User) {
    const { title, description } = dto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board);
    return board;
  }

  async getBoardById(id: number) {
    const found = await this.findOneBy({
      id,
    });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number, user: User) {
    const result = await this.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus) {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.save(board);
    return board;
  }
}
