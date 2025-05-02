
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    Fname: string;

    @Column({ length: 255 })
    Lname: string;

    @Column({ length: 10 })
    Age: string;

    @Column({ length: 100 })
    Address: string;

    @Column({ length: 50 })
    Phone: string;


}

