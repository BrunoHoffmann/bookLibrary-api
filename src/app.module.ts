import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './Controllers/books/books.controller';
import { BooksService } from './Services/books/books.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/biblioteca', {
      useNewUrlParse: true,
      useInifiedTopology: true,
    }),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class AppModule {}
