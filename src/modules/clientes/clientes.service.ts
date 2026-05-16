import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ClienteEstado } from '../../generated/prisma/enums';

@Injectable()
export class ClientesService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createClienteDto: CreateClienteDto) {
    try {
      const clienteNuevo = await this.prisma.cliente.create({
        data: {
          ...createClienteDto
        }
      })
      Logger.verbose('Cliente creado con exito', { ...clienteNuevo })
      return {
        ok: true,
        code: 201,
        message: 'El cliente fue creado con exito'
      };
    } catch (error) {
      Logger.error(error)
      throw new BadRequestException('No se pudo registrar al cliente')
    }
  }

  async findAll() {
    const clientes = await this.prisma.cliente.findMany()
    return {
      ok: true,
      code: 200,
      message: 'El cliente fue creado con exito',
      data: clientes ?? []
    };
  }

  async findOne(id: string) {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } })
    if (!cliente) {
      throw new NotFoundException('EL cliente no fue encontrado')
    }
    return {
      ok: true,
      code: 200,
      message: 'El cliente fue creado con exito',
      data: cliente
    };
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    try {
      const clienteModificado = await this.prisma.cliente.update({
        data: {
          ...updateClienteDto
        },
        where: {
          id
        }
      })
      Logger.verbose('Cliente modificado con exito', { ...clienteModificado })
      return {
        ok: true,
        code: 200,
        message: 'El cliente fue modificado con exito',
      };
    } catch (error) {
      Logger.error(error)
      throw new BadRequestException('No se pudo actualizar al cliente')
    }
  }

  async block(id: string) {
    const clienteBloqueado = await this.prisma.cliente.update({
      data: {
        estado: ClienteEstado.BLOQUEADO
      },
      where: {
        id
      }
    })
    Logger.verbose('Cliente bloqueado con exito', { ...clienteBloqueado })
    return {
      ok: true,
      code: 200,
      message: 'El cliente fue bloqueado con exito',
    };
  }

  async unblock(id: string) {
    const clienteActivado = await this.prisma.cliente.update({
      data: {
        estado: ClienteEstado.ACTIVO
      },
      where: {
        id
      }
    })
    Logger.verbose('Cliente desbloqueado con exito', { ...clienteActivado })
    return {
      ok: true,
      code: 200,
      message: 'El cliente fue desbloqueado con exito',
    };
  }

  async remove(id: string) {
    const clienteInactivado = await this.prisma.cliente.update({
      data: {
        estado: ClienteEstado.INACTIVO
      },
      where: {
        id
      }
    })
    Logger.verbose('Cliente deshabilitado con exito', { ...clienteInactivado })
    return {
      ok: true,
      code: 200,
      message: 'El cliente fue deshabilitado con exito',
    };
  }
}
