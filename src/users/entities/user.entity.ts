import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Classes } from 'src/classes/entities/classes.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    username: string;

    @Column({ length: 255 })
    password: string;

    @Column({ nullable: true })
    fullName?: string;

    @Column({ default: 'pending' })
    status?: string;

    @Column({nullable: true})
    avatar?: string;

    @OneToMany(() => Role, role => role.user, { cascade: true })
    roles: Role[];

    @OneToOne(() => Teacher, teacher => teacher.user)
    teacher?: Teacher[];

    @OneToMany(() => Comment, comment => comment.user)
    comments?: Comment[];

    @ManyToOne(() => Classes, classes => classes.teacher, { nullable: true })
    class?: Classes;  // Only for students/teachers

    @OneToMany(() => Attendance, attendance => attendance.user)
    attendances?: Attendance[];
}
