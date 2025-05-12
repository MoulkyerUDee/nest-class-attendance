import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classes } from './entities/classes.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classes, Teacher])],
  controllers: [ClassesController],
  providers: [ClassesService]
})
export class ClassesModule {}
