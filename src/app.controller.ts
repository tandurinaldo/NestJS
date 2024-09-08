import { Controller, Get, Post, Body } from '@nestjs/common';
import { BukuService } from './buku.service';
import { AppService } from './app.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BukuService) {}

  @Post('borrow')
  async borrowBook(@Body() { bookCode, memberCode }) {
    return this.bookService.borrowBook(bookCode, memberCode);
  }

  @Post('return')
  async returnBook(@Body() { bookCode, memberCode, daysBorrowed }) {
    return this.bookService.returnBook(bookCode, memberCode, daysBorrowed);
  }

  @Get('check')
  async checkBooks() {
    return this.bookService.checkBooks();
  }
}

@Controller('members')
export class MemberController {
  constructor(private readonly bookService: BukuService) {}

  @Get('check')
  async checkMembers() {
    return this.bookService.checkMembers();
  }
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}