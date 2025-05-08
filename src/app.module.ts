import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from './teacher/entities/teacher.entity';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
import { Student } from './students/entities/student.entity';
import { Classes } from './classes/entities/classes.entity';
import { SupervisorModule } from './supervisor/supervisor.module';

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
      entities: [User,Teacher,Classes],
      synchronize: true,
    }),
    UsersModule,
    TeacherModule,
    ClassesModule,
    StudentsModule,
    SupervisorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
