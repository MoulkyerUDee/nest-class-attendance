import { Meeting } from "src/meetings/entities/meeting.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused',
}

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.ABSENT,
  })
  status: AttendanceStatus;

  @Column()
  date: Date;

  @ManyToOne(() => Meeting, meeting => meeting.attendance, { cascade: true })
  meeting: Meeting;

  //@ManyToOne(() => User, user => user.attendance, { cascade: true })
  //user: User;
}
