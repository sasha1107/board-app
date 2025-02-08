import { IsNotEmpty } from "class-validator";
import type { Board } from "../board.entity";

export class CreateBoardDto {
  @IsNotEmpty()
  title: Board["title"];

  @IsNotEmpty()
  description: Board["description"];
}
