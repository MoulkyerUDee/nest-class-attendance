import { Class } from 'src/class/entities/class.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    Fname?: string;

    @Column({ length: 255 })
    Lname: string;

    @Column({ length: 50 })
    Phone?: string;

    @Column({ length: 50 })
    email?: string;

    @OneToMany(() => Class, classes => classes.teacher)
    classes: Class[];

    @OneToMany(() => Comment, comment => comment.teacher)
    comments: Comment[];

    @OneToOne(() => User, user => user.teacher, { cascade: true })
    @JoinColumn({ name: 'userId'})
    user?: User;
}

