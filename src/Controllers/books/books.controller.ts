import { Controller, Get, Post, Patch, Delete, Body } from '@nestjs/common';

import { BookDTO } from '../../DTO/books.dto';

@Controller('books')
export class BooksController {
  @Get()
  getAllBooks(): string {
    return 'Todos os livros estão aqui';
  }

  @Post()
  saveBook(@Body() newBook: BookDTO): BookDTO {
    return newBook;
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
