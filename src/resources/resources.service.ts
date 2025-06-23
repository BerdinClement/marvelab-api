import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService {
  private readonly resources: Resource[];

  constructor() {
    const filePath = path.resolve(__dirname, '../../db/data.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(rawData) as {
      resources: Resource[];
    };
    this.resources = parsedData.resources;
  }
  findAll() {
    return this.resources;
  }

  findOne(id: number) {
    const resource = this.resources.find((resource) => resource.id === id);
    if (!resource) {
      throw new Error(`Resource with id ${id} not found`);
    }
    return resource;
  }
}
