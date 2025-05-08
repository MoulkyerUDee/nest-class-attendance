import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { RefreshToken } from './refresh-token.entity';
;

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    username: string;

    @Column({ length: 255 })
    password: string;

    @Column({ nullable: true })
    fullName: string;

    @Column({ default: 'pending' })
    status: string;

    @OneToMany(() => Role, role => role.user, { cascade: true })
    roles: Role[];

    @OneToMany(() => RefreshToken, token => token.user)
    refreshTokens: RefreshToken[];
}
