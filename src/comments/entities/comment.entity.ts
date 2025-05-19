import { Meeting } from "src/meetings/entities/meeting.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    createdAt: Date;

    @ManyToOne(() => Meeting, meeting => meeting.comments, { cascade: true })
    meeting: Meeting;

    @ManyToOne(() => Teacher, teacher => teacher.comments, { cascade: true })
    teacher: Teacher;
}
