import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { UserEntity } from '../entities';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAllUsers(): Promise<UserEntity[]> {
    return await this.userService.findAllUsers();
  }

  @Post()
  public async createUser(@Body() body: UserDTO): Promise<UserEntity> {
    return await this.userService.createUser(body);
  }

  @Post('add-to-project')
  public async addUserToProject(@Body() body: UserToProjectDTO): Promise<any> {
    return await this.userService.addUserToProject(body);
  }

  @Get(':id')
  public async findUserById(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findUserById(id);
  }

  @Patch(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDTO,
  ): Promise<UpdateResult> {
    return await this.userService.updateUser(id, body);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.deleteUser(id);
  }
}
