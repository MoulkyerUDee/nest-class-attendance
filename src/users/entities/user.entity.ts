import { Role } from 'src/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    username: string;
    
    @Column({length: 255})
    password: string;

    @Column({nullable: true})
    fullName: string;

    @Column({default: 'pending'})
    status: string;

    @Column({nullable: true})
    avatar: string;

    @Column({type: String, length: 25})
    role: Role;
}
