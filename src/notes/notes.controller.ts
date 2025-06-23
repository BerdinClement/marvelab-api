import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      return this.notesService.findOne(id);
    } catch (ex) {
      throw new NotFoundException(ex);
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto) {
    try {
      return this.notesService.update(id, updateNoteDto);
    } catch (ex) {
      throw new NotFoundException(ex);
    }
  }
}
