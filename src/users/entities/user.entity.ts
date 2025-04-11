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
}
