import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import { BooksService } from 'src/Services/books/books.service';

import { BookDTO } from '../../DTO/books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async getAllBooks(): Promise<BookDTO[]> {
    return await this.bookService.getAllBooks();
  }

  @Post()
  async saveBook(@Body() newBook: BookDTO): Promise<BookDTO> {
    return await this.bookService.saveBook(newBook);
  }

  @Patch()
  updateBook(): string {
    return 'Este livro foi atualizado!';
  }

  @Delete()
  deleteBook(): string {
    return 'Este livro foi deletado!';
  }
}
