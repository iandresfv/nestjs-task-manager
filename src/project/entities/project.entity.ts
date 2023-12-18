import { BaseEntity } from 'src/config';
import { IProject } from 'src/interfaces';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;
}
