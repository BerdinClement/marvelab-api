import { Controller, Get, Body, Patch, Param, NotFoundException } from '@nestjs/common';
import { InterpretationsService } from './interpretations.service';
import { UpdateInterpretationDto } from './dto/update-interpretation.dto';

@Controller('interpretations')
export class InterpretationsController {
  constructor(
    private readonly interpretationsService: InterpretationsService,
  ) {}

  @Get()
  findAll() {
    return this.interpretationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      return this.interpretationsService.findOne(id);
    } catch (ex) {
      throw new NotFoundException(ex);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateInterpretationDto: UpdateInterpretationDto,
  ) {
    try {
      return this.interpretationsService.update(id, updateInterpretationDto);
    } catch (ex) {
      throw new NotFoundException(ex);
    }
  }
}
