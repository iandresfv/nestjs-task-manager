import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config';
import { ACCESS_LEVEL } from '../../constants';
import { ProjectEntity } from '../../project/entities';
import { UserEntity } from './user.entity';

@Entity({ name: 'users_projects' })
export class UserProjectEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESS_LEVEL, default: ACCESS_LEVEL.MANTEINER })
  accessLevel: ACCESS_LEVEL;

  @ManyToOne(() => UserEntity, (user) => user.projects)
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.users)
  project: ProjectEntity;
}
