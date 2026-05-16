-- CreateEnum
CREATE TYPE "ClienteEstado" AS ENUM ('ACTIVO', 'INACTIVO', 'BLOQUEADO');

-- CreateTable
CREATE TABLE "cliente" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apodo" TEXT NOT NULL,
    "email" TEXT,
    "telefono" TEXT NOT NULL,
    "etiquetas" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "estado" "ClienteEstado" NOT NULL DEFAULT 'ACTIVO',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conversaciones" TEXT,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_telefono_key" ON "cliente"("telefono");
