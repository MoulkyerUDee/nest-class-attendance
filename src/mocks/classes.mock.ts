import { Class } from "src/class/entities/class.entity";


export const mockClasses: Class[] = [
  {
    id: 1,
    className: 'Math 101',
    classSchedule: new Date('2023-10-01T09:00:00'),
    classSection: 'A',
    meetings: [],
    teacher: {
        id: 1, Lname: 'Dr. Smith',
        classes: []
    },
    students: []
  },
  {
    id: 2,
    className: 'History 201',
    classSchedule: new Date('2023-10-02T10:00:00'),
    classSection: 'B',
    meetings: [],
    teacher: {
        id: 2, Lname: 'Prof. Johnson',
        classes: []
    },
    students: []
  },
  {
    id: 3,
    className: 'Science 301',
    classSchedule: new Date('2023-10-03T11:00:00'),
    classSection: 'C',
    meetings: [],
    teacher: {
        id: 3, Lname: 'Dr. Brown',
        classes: []
    },
    students: []
  }
  {
    id: 4,
    className: 'English 101',
    classSchedule: new Date('2023-10-04T08:00:00'),
    classSection: 'D',
    meetings: [],
    teacher: {
      id: 4,
      Lname: 'Ms. Carter',
      classes: [],
    },
    students: [],
  },
  {
    id: 5,
    className: 'Computer Science 101',
    classSchedule: new Date('2023-10-05T13:00:00'),
    classSection: 'E',
    meetings: [],
    teacher: {
      id: 5,
      Lname: 'Mr. Lopez',
      classes: [],
    },
    students: [],
  },
  {
    id: 6,
    className: 'Philosophy 101',
    classSchedule: new Date('2023-10-06T15:00:00'),
    classSection: 'F',
    meetings: [],
    teacher: {
      id: 6,
      Lname: 'Dr. Ali',
      classes: [],
    },
    students: [],
  },
  {
    id: 7,
    className: 'PE 101',
    classSchedule: new Date('2023-10-07T07:00:00'),
    classSection: 'G',
    meetings: [],
    teacher: {
      id: 7,
      Lname: 'Coach Reyes',
      classes: [],
    },
    students: [],
  },
  {
    id: 8,
    className: 'Economics 101',
    classSchedule: new Date('2023-10-08T12:00:00'),
    classSection: 'H',
    meetings: [],
    teacher: {
      id: 8,
      Lname: 'Prof. Santiago',
      classes: [],
    },
    students: [],
  },
   
];