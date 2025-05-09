import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Role } from './users/entities/role.entity';
import { RolesModule } from './users/roles.module'; //
import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from './teacher/entities/teacher.entity';
import { ClassesModule } from './classes/classes.module';
import { StudentsModule } from './students/students.module';
import { Classes } from './classes/entities/classes.entity';
import { CommentsModule } from './comments/comments.module';
import { MeetingsModule } from './meetings/meetings.module';
import { Meeting } from './meetings/entities/meeting.entity';
import { Comment } from './comments/entities/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env'],
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ClassAttendanceDB',
      entities: [User,Role,Teacher,Classes,Meeting,Comment],
      synchronize: true,
    }),
    UsersModule,
    TeacherModule,
    ClassesModule,
    StudentsModule,
    RolesModule, // ✅ Add RolesModule here
    TeacherModule,
    ClassesModule,
    StudentsModule,
    CommentsModule,
    MeetingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
