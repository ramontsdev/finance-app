import { IDecrypter } from '../../domain/use-cases/cryptography/decrypter';
import { IFindUserById } from '../../domain/use-cases/user/find-user-by-id';
import { HttpRequest } from '../protocols/http';

export class LoadUserByRequest {
  constructor(
    private readonly decrypter: IDecrypter,
    private readonly findUserById: IFindUserById,
  ) {}

  async loadUser(httpRequest: HttpRequest) {
    const token = this.extractTokenFromHeader(httpRequest);
    if (!token) return null;

    const payload = this.decryptToken(token);
    if (!payload) return null;

    const member = await this.findUserById.findById(payload.sub);

    return member;
  }

  private extractTokenFromHeader(httpRequest: HttpRequest): string | undefined {
    const [type, token] = httpRequest.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  private decryptToken(token: string): { sub: string } | null {
    const payload = this.decrypter.decrypt(token);

    return payload;
  }
}
