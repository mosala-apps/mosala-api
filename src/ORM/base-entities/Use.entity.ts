import { Column } from 'typeorm';
export default class UserBaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
