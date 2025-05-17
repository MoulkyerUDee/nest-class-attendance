import { Classes } from "src/classes/entities/classes.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Attendance } from "src/attendance/entities/attendance.entity";
import { MeetingStatus } from "src/enums/meeting-status.enum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";


@Entity()
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content?: string;
    
    @Column()
    createdAt: Date;

    @Column({type: 'enum', enum: MeetingStatus, default: MeetingStatus.UPCOMING,})
    status: MeetingStatus;

    @OneToMany(() => Attendance, attendance => attendance.meeting)
    attendances: Attendance[];

    @OneToMany(() => Comment, comment => comment.meeting)
    comments?: Comment[];

    @ManyToOne(() => Classes, classes => classes.meetings, { cascade: true })
    classes: Classes[];
}