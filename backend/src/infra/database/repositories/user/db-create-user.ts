import { User } from '../../../../domain/models/user';
import { IHasher } from '../../../../domain/use-cases/cryptography/hasher';
import { ICreateUser, UserDTO } from '../../../../domain/use-cases/user/create-user';
import { prismaClient } from '../../postgres-db';

export class DbCreateUser implements ICreateUser {
  constructor(private readonly hasher: IHasher) {}

  async create(userDTO: UserDTO): Promise<User> {
    const hashedPassword = await this.hasher.hash(userDTO.password);

    return prismaClient.user.create({
      data: {
        ...userDTO,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });
  }
}
