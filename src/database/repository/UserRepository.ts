import { Injectable } from "@nestjs/common";
import { PrismaService } from "../PrismaService";
import { Prisma } from "@prisma/client";


@Injectable()
export class UserRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findOne(where: Prisma.UserWhereInput) {
    return this.prisma.user.findFirst({where});
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({data});
  }
}