import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class base{
    @PrimaryGeneratedColumn()
    id: number; 

    @CreateDateColumn()
    date: Date
}