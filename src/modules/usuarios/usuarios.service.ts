import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { EncryptPassword } from '../../shared';

@Injectable()
export class UsuariosService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuarioCreado = await this.prisma.usuario.create({
        data: {
          ...createUsuarioDto,
          password: await EncryptPassword(createUsuarioDto.password)
        }
      })
      Logger.verbose('Creacion de nuevo usuario', { usuarioCreado })
      return {
        ok: true,
        code: 201,
        message: 'El usuario fue creado con exito',
      };
    } catch (error) {
      Logger.error(error)
      throw new BadRequestException('No se pudo registrar al usuario')
    }
  }

  async findAll() {
    const usuarios = await this.prisma.usuario.findMany()
    return {
      ok: true,
      code: 200,
      message: 'Lista de usuarios',
      data: usuarios ?? []
    };
  }

  async findOne(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id
      }
    })
    if (!usuario) {
      throw new NotFoundException('El usuario no fue encontrado')
    }
    return {
      ok: true,
      code: 200,
      message: 'Datos del usuario encontrado',
      data: usuario
    };
  }

  async update(id: string, { password, ...ToUpdate }: UpdateUsuarioDto) {
    try {
      const usuario = await this.findOne(id)
      const usuarioModificado = await this.prisma.usuario.update({
        data: {
          ...ToUpdate
        },
        where: {
          id
        }
      })
      Logger.verbose('Actualizacion de un usuario', { usuarioModificado, usuario })
      return {
        ok: true,
        code: 200,
        message: 'El usuario fue modificado con exito'
      };
    } catch (error) {
      Logger.error(error)
      throw new BadRequestException('No se pudo actualizar al usuario')
    }
  }

  async remove(id: string) {
    const usuarioRemovido = await this.prisma.usuario.update({
      data: {
        estado: false
      },
      where: {
        id
      }
    })
    return {
      ok: true,
      code: 200,
      message: 'El usuario fue dado de baja con exito',
      data: usuarioRemovido
    };
  }

  async restore(id: string) {
    const usuarioRestaurado = await this.prisma.usuario.update({
      data: {
        estado: true
      },
      where: {
        id
      }
    })
    return {
      ok: true,
      code: 200,
      message: 'El usuario fue dado de alta con exito',
      data: usuarioRestaurado
    };
  }
}
