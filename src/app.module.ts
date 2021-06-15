import { Module } from '@nestjs/common';
import { BooksController } from './Controllers/books/books.controller';

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [],
})
export class AppModule {}
