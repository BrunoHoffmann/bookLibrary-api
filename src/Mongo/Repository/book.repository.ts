import { Injectable } from '@nestjs/common';
import { BookDTO } from 'src/DTO/books.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../Interfaces/book.interface';

@Injectable()
export class BookRepository {
  constructor(@InjectModel('book') private readonly bookModel: Model<Book>) {}

  async getAllBooks(): Promise<Book[]> {
    return await this.bookModel
      .find({}, { __v: false })
      .sort({ name: +1 })
      .exec();
  }

  async getBookById(bookID: string): Promise<Book> {
    return await this.bookModel.findById(bookID, { __v: false });
  }

  async getBookByAuthorName(authorName: string[]): Promise<Book[]> {
    return await this.bookModel.find(
      {
        $or: [
          { 'author.name': { $in: authorName } },
          { 'author.surname': { $in: authorName } },
        ],
      },
      { __v: false },
    );
  }

  async getBookByName(bookName: string): Promise<Book[]> {
    return await this.bookModel.find(
      { name: { $regex: bookName, $options: 'i' } },
      { __v: false },
    );
  }

  async saveBook(newBook: BookDTO): Promise<Book> {
    const saveBook = new this.bookModel(newBook);
    return await saveBook.save();
  }

  async updateBookById(bookID: string, newBook: BookDTO): Promise<Book> {
    return await this.bookModel.findById(bookID).replaceOne(newBook);
  }

  async deleteBookById(bookID: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(bookID);
  }
}
