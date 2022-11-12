import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { message } from 'src/error/errorMessage';

export class CreateUser {
  @ApiProperty({
    type: 'email',
    example: 'yash@yash.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'yash',
  })
  @IsNotEmpty({ message: 'Name Must be Required !!' })
  name: string;

  @IsString({ message: 'password must be Required' })
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: message.passwordWeak,
  })
  @ApiProperty({
    example: 'yash@123',
  })
  password: string;
}

export class LoginUser {
  @ApiProperty({
    type: 'email',
    example: 'yash@yash.com',
  })
  @IsEmail()
  email: string;

  @IsString({ message: 'password must be Required' })
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: message.passwordWeak,
  })
  @ApiProperty({
    example: 'yash@123',
  })
  password: string;
}
