import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async validarUsuario(email: string, password: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        email
      }
    });
    if (usuario && compareSync(password, usuario.password)) {
      const { password, ...result } = usuario;
      return result;
    }
    return null;
  }

  login(user: any) {
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
