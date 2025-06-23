import { Injectable } from '@nestjs/common';
import { UpdateInterpretationDto } from './dto/update-interpretation.dto';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { Interpretation } from './entities/interpretation.entity';

@Injectable()
export class InterpretationsService {
  private readonly interpretations: Interpretation[];

  constructor() {
    const filePath = path.resolve(__dirname, '../../db/data.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(rawData) as {
      interpretations: Interpretation[];
    };
    this.interpretations = parsedData.interpretations;
  }

  findAll() {
    return this.interpretations;
  }

  findOne(id: number) {
    const interpretation = this.interpretations.find(
      (interpretation) => interpretation.id == id,
    );
    if (!interpretation) {
      throw new Error(`Interpretation with ID ${id} not found`);
    }
    return interpretation;
  }

  update(id: number, updateInterpretationDto: UpdateInterpretationDto) {
    const interpretationIndex = this.interpretations.findIndex(
      (interpretation) => interpretation.id == id,
    );

    if (interpretationIndex === -1) {
      throw new Error(`Interpretation with ID ${id} not found`);
    }

    const updatedInterpretation = {
      ...this.interpretations[interpretationIndex],
      ...updateInterpretationDto,
    };

    this.interpretations[interpretationIndex] = updatedInterpretation;

    // Save the updated interpretations back to the file
    const filePath = path.resolve(__dirname, '../../db/data.json');
    fs.writeFileSync(
      filePath,
      JSON.stringify({ interpretations: this.interpretations }, null, 2),
    );

    return updatedInterpretation;
  }
}
