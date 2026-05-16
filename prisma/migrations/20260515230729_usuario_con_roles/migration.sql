-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('ADMIN', 'AGENTE');

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "conversaciones" TEXT,
ADD COLUMN     "fecha_nacimiento" TIMESTAMP(3),
ADD COLUMN     "rol" "RolUsuario"[] DEFAULT ARRAY['AGENTE']::"RolUsuario"[];
