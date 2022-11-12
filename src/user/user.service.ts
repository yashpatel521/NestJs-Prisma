import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(userId: number, email: string): Promise<User[] | User> {
    if (userId) {
      return await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    } else if (email) {
      return await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } else {
      return await this.prisma.user.findMany({
        include: {
          posts: true,
        },
      });
    }
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    data.posts = {
      create: {
        title: 'Hello World',
      },
    };
    return await this.prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }
}
