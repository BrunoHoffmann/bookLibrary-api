import { Injectable } from '@nestjs/common';
import { BookDTO } from 'src/DTO/books.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../Interfaces/book.interface';

@Injectable()
export class BookRepository {
  constructor(@InjectModel('book') private readonly bookModel: Model<Book>) {}

  async getAllBooks(): Promise<BookDTO[]> {
    return await this.bookModel
      .find({}, { __v: false })
      .sort({ name: +1 })
      .exec();
  }

  async saveBook(newBook: BookDTO): Promise<BookDTO> {
    const saveBook = new this.bookModel(newBook);
    return await saveBook.save();
  }
}