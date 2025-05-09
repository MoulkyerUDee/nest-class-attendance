import { Comment } from "src/comments/entities/comment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;
    
    @Column()
    createdAt: Date;

    @OneToMany(() => Comment, comment => comment.meeting)
    comments: Comment[];
}
