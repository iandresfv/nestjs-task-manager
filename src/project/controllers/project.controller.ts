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
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { ProjectEntity } from '../entities';
import { ProjectService } from '../services/project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  public async findAllProjects(): Promise<ProjectEntity[]> {
    return await this.projectService.findAllProjects();
  }

  @Post()
  public async createProject(@Body() body: ProjectDTO): Promise<ProjectEntity> {
    return await this.projectService.createProject(body);
  }

  @Get(':id')
  public async findProjectById(
    @Param('id') id: string,
  ): Promise<ProjectEntity> {
    return await this.projectService.findProjectById(id);
  }

  @Patch(':id')
  public async updateProject(
    @Param('id') id: string,
    @Body() body: ProjectUpdateDTO,
  ): Promise<UpdateResult> {
    return await this.projectService.updateProject(id, body);
  }

  @Delete(':id')
  public async deleteProject(@Param('id') id: string): Promise<DeleteResult> {
    return await this.projectService.deleteProject(id);
  }
}
