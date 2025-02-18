import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { Role } from "./Role"
import { ManyToMany, JoinTable } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    senha: string

    @ManyToMany(() => Role)
    @JoinTable({name: "userRoles"})
    roles: Role[]

}
