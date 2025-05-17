import { Classes } from "src/classes/entities/classes.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { MeetingStatus } from "src/enums/meeting-status.enum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Comment, comment => comment.meeting)
    comments?: Comment[];

    @ManyToOne(() => Classes, classes => classes.meetings, { cascade: true })
    classes: Classes[];
}