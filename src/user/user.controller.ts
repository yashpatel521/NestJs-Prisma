import {
  Controller,
  Get,
  Post,
  BadRequestException,
  Query,
  Body,
  Request,
} from '@nestjs/common';
import { message } from '../error/errorMessage';
import { CreateUser } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiResponse } from '@nestjs/swagger';
import {
  userCreate,
  userCreateError,
  userList,
} from '../ApiResponsExample/user';
import { User as UserModal } from '@prisma/client';
import { Public } from 'src/constants/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiResponse({
    status: 200,
    schema: {
      example: userList,
    },
  })
  @Get()
  async getAllUsers(
    @Query('userId') userId: number,
    @Query('email') email: string,
  ): Promise<UserModal[] | UserModal> {
    return await this.userService.findAllUsers(+userId, email);
  }

  @Post()
  @ApiResponse({
    status: 200,
    schema: {
      example: userCreate,
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: userCreateError,
    },
  })
  async createUser(@Body() userData): Promise<UserModal> {
    const userExits = await this.userService.findByEmail(userData.email);
    if (userExits) {
      throw new BadRequestException(message.emailExists);
    }
    return await this.userService.create(userData);
  }
}
