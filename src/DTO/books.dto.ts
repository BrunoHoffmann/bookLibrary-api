import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class BookDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly name: string;

  @IsNotEmpty()
  readonly author: string[];

  @IsNotEmpty()
  readonly releaseYear: number;

  @IsNotEmpty()
  readonly publisher: string;

  @IsNotEmpty()
  readonly pages: number;
}
