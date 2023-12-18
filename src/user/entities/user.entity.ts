import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config';
import { ROLES } from '../../constants';
import { IUser } from '../../interfaces';
import { UserProjectEntity } from './user-project.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.BASIC })
  role: ROLES;

  @OneToMany(() => UserProjectEntity, (userProject) => userProject.user)
  projects: UserProjectEntity[];
}
