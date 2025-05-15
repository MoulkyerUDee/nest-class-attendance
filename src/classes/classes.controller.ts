import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassesDto } from './dto/create-classes.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('classes')
export class ClassesController {
    constructor(private readonly classesService: ClassesService) {}

@ApiBearerAuth()
@Post()
create(@Body() createClassesDto: CreateClassesDto) {
  return this.classesService.create(createClassesDto);
}

@ApiBearerAuth()
@Get()
findAll() {
  return this.classesService.findAll();
}

@ApiBearerAuth()
@Get(':id')
findOne(@Param('id') id: string) {
  return this.classesService.findOne(+id);
}

@ApiBearerAuth()
@Patch(':id')
update(@Param('id') id: string, @Body() UpdateClassesDto: UpdateClassesDto) {
  return this.classesService.update(+id, UpdateClassesDto);
}

@ApiBearerAuth()
@Delete(':id')
remove(@Param('id') id: string) {
  return this.classesService.remove(+id);
}}
