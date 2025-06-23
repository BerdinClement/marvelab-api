import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { InterpretationsModule } from './interpretations/interpretations.module';

@Module({
  imports: [NotesModule, InterpretationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
