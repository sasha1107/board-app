import { Injectable } from "@nestjs/common";
import { BoardStatus, type Board } from "./board.model";
import { v1 as uuid } from "uuid";
import type { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }

  createBoard(dto: CreateBoardDto) {
    const { title, description } = dto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string) {
    return this.boards.find((board) => board.id === id);
  }
}
