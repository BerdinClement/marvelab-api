import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      return this.resourcesService.findOne(id);
    } catch (ex) {
      return new NotFoundException(ex);
    }
  }
}
