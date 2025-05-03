import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Classes {
    @PrimaryGeneratedColumn()
    classesId: number;

    @Column({ length: 50 })
    className: string;

    @Column({ })
    classSchedule: Date;
}