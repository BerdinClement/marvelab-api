import { Injectable } from '@nestjs/common';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class NotesService {
  private readonly notes: Note[];

  constructor() {
    const filePath = path.resolve(__dirname, '../../db/data.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(rawData) as { notes: Note[] };
    this.notes = parsedData.notes;
  }
  findAll() {
    return this.notes;
  }

  findOne(id: number) {
    console.log(this.notes);
    const note = this.notes.find((note) => note.id == id);
    if (!note) {
      throw new Error(`Note with ID ${id} not found`);
    }
    return note;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      throw new Error(`Note with ID ${id} not found`);
    }

    const updatedNote: Note = {
      ...this.notes[noteIndex],
      ...updateNoteDto,
    };

    this.notes[noteIndex] = updatedNote;

    const filePath = path.resolve(__dirname, '../../db/data.json');
    fs.writeFileSync(filePath, JSON.stringify({ notes: this.notes }, null, 2));

    return updatedNote;
  }
}
