import { IsNotEmpty } from "class-validator";
import type { Board } from "../board.model";

export class CreateBoardDto implements Pick<Board, "title" | "description"> {
  @IsNotEmpty()
  title: Board["title"];

  @IsNotEmpty()
  description: Board["description"];
}
