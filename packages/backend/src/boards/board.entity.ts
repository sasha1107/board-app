import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { User } from "@/auth/user.entity";

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @ManyToOne(() => User, (user) => user.boards, { eager: false })
  user: User;
}
