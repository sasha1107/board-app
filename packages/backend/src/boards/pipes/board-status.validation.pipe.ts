import { PipeTransform, BadRequestException } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {
  // 클래스 외부에서 액세스할 수 있지먄 해당 값은 변경할 수 없다.
  readonly StatusOptions: string[] = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: unknown) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`Invalid status`);
    }
    return value;
  }

  private isStatusValid(status: unknown) {
    if (typeof status !== "string") {
      return false;
    }
    return this.StatusOptions.find((s) => s === status.toUpperCase());
  }
}
