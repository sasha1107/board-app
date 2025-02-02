import type { Board } from "../board.model";

export class CreateBoardDto implements Pick<Board, "title" | "description"> {
  title: Board["title"];
  description: Board["description"];
}
