import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';
import { BooksService } from 'src/Services/books/books.service';

import { BookDTO } from '../../DTO/books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  getAllBooks(): string {
    return 'Todos os livros estão aqui';
  }

  @Post()
  saveBook(@Body() newBook: BookDTO): BookDTO {
    return this.bookService.saveBook(newBook);
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
