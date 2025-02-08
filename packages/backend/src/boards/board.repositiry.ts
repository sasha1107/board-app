import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Board } from "./board.entity";

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
}
