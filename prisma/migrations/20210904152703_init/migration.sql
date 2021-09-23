-- CreateEnum
CREATE TYPE "MemberType" AS ENUM ('CONTRACTOR', 'EMPLOYEE');

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "MemberType" NOT NULL,
    "tags" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contractor" (
    "id" SERIAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "memberId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contractor.memberId_unique" ON "Contractor"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee.memberId_unique" ON "Employee"("memberId");

-- AddForeignKey
ALTER TABLE "Contractor" ADD FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
