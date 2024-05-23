import { Column, Entity } from "typeorm";
import { base } from "./base.entity";

@Entity()
export class User extends base {
    @Column()
    username: string;

    @Column()
    email: string


    @Column()
    password:string

    @Column({default: false})
    blocked: boolean
}