import bcrypt from 'bcryptjs';

import { IHashComparer } from '../../domain/use-cases/cryptography/hash-comparer';
import { IHasher } from '../../domain/use-cases/cryptography/hasher';

export class BcryptAdapter implements IHasher, IHashComparer {
  constructor(private readonly salt: number) {}

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }

  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
