import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TeacherModule } from './teacher/teacher.module';
import { teacher } from './teacher/entities/teacher.entity';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
import { Student } from './students/entities/student.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env'],
      load: [configuration]
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ClassAttendanceDB',
<<<<<<< HEAD
      entities: [User,teacher],
=======
      entities: [teacher, Student],
>>>>>>> 225401d (Added temporary Students module)
      synchronize: false,
    }),
    UsersModule,
    TeacherModule,
    ClassesModule,
    StudentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
