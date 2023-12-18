import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async create(body: UserDTO): Promise<UserEntity> {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOne(id: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async update(
    id: string,
    body: UserUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const updatedUser: UpdateResult = await this.userRepository.update(
        id,
        body,
      );
      if (updatedUser.affected === 0) {
        return undefined;
      }
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async delete(id: string): Promise<DeleteResult | undefined> {
    try {
      const deletedUser: DeleteResult = await this.userRepository.delete(id);
      if (deletedUser.affected === 0) {
        return undefined;
      }
      return deletedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}
