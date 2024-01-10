import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectEntity } from '../entities';
import { ErrorManager } from 'src/utils/error-manager';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  public async createProject(body: ProjectDTO): Promise<ProjectEntity> {
    try {
      return await this.projectRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllProjects(): Promise<ProjectEntity[]> {
    try {
      const projects: ProjectEntity[] = await this.projectRepository.find();
      if (!projects.length) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No projects found',
        });
      }
      return projects;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findProjectById(id: string): Promise<ProjectEntity> {
    try {
      const project: ProjectEntity = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .leftJoinAndSelect('project.users', 'users')
        .leftJoinAndSelect('users.user', 'user')
        .getOne();
      if (!project) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Project not found',
        });
      }
      return project;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateProject(
    id: string,
    body: ProjectUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const updatedProject: UpdateResult = await this.projectRepository.update(
        id,
        body,
      );
      if (updatedProject.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Unable to update project',
        });
      }
      return updatedProject;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteProject(id: string): Promise<DeleteResult | undefined> {
    try {
      const deletedProject: DeleteResult =
        await this.projectRepository.delete(id);
      if (deletedProject.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Unable to delete project',
        });
      }
      return deletedProject;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
