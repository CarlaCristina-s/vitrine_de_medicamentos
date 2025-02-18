import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    description: string;

    @Column({default: new Date()})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

    @ManyToMany(() => User)
    @JoinTable({name: "userRoles"})
    users: User[]

    @ManyToMany(() => Permission)
    @JoinTable({name: "permissionRoles"})
    permissions: Permission[]
}