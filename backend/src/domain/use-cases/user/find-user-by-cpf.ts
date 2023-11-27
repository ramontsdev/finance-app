import { User } from '../../models/user';

export interface IFindMemberByCPF {
  findByCPF(cpf: string): Promise<User | null>;
}
