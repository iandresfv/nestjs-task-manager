import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config';
import { IProject } from '../../interfaces';
import { UserProjectEntity } from '../../user/entities';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UserProjectEntity, (userProject) => userProject.project)
  users: UserProjectEntity[];
}
