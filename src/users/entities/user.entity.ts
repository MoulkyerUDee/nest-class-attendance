import { Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;
    
    @Column({length: 255})
    password: string;

    @Column({nullable: true})
    fullName: string;

    @Column({default: 'pending'})
    status: string;

    @Column({nullable: true})
    avatar: string;

    @ManyToOne(() => Role, role => role.users)
    role: Role;
}
