import { BadRequestException, Injectable } from '@nestjs/common';
import { BookDTO } from 'src/DTO/books.dto';
import { BookRepository } from 'src/Mongo/Repository/book.repository';
import { Book } from '../../mongo/Interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getAllBooks(): Promise<Book[]> {
    const allBooks = await this.bookRepository.getAllBooks();

    if (!allBooks.length)
      throw new BadRequestException('There are no books registered yet');

    return allBooks;
  }

  async getBookById(bookID: string): Promise<Book> {
    try {
      const existsBook = await this.bookRepository.getBookById(bookID);

      if (!existsBook) throw new BadRequestException('There are no results');

      return existsBook;
    } catch (e) {
      throw new BadRequestException('There are no results');
    }
  }

  async getBookByAuthorName(authorName: string): Promise<Book[]> {
    const spliteAuthorName = authorName.split(' ');

    const foundBooks = await this.bookRepository.getBookByAuthorName(
      spliteAuthorName,
    );

    if (!foundBooks.length)
      throw new BadRequestException('NO results for this author');

    return foundBooks;
  }

  async getBookByName(bookName: string): Promise<Book[]> {
    const foundBooks = await this.bookRepository.getBookByName(bookName);

    if (!foundBooks.length)
      throw new BadRequestException('NO results for this book');

    return foundBooks;
  }

  async saveBook(newBook: BookDTO): Promise<Book> {
    return await this.bookRepository.saveBook(newBook);
  }

  async updateBookById(bookID: string, newBook: BookDTO): Promise<Book> {
    const existsBook = await this.bookRepository.getBookById(bookID);

    if (!existsBook)
      throw new BadRequestException('There are no results with this ID');

    const updateBook = await this.bookRepository.updateBookById(
      bookID,
      newBook,
    );

    if (updateBook) return this.bookRepository.getBookById(bookID);
    else throw new BadRequestException('There are no results with this ID');
  }

  async deleteBookById(bookID: string): Promise<Book> {
    try {
      return await this.bookRepository.deleteBookById(bookID);
    } catch (e) {
      throw new BadRequestException('This book does not exists');
    }
  }
}
