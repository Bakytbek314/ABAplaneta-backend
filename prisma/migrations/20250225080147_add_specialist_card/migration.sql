-- CreateTable
CREATE TABLE "specialist_cards" (
    "id" SERIAL NOT NULL,
    "specialistId" INTEGER NOT NULL,
    "description" TEXT,
    "photo" TEXT,
    "diploma_photo" TEXT,

    CONSTRAINT "specialist_cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "specialist_cards_specialistId_key" ON "specialist_cards"("specialistId");

-- AddForeignKey
ALTER TABLE "specialist_cards" ADD CONSTRAINT "specialist_cards_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "specialists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
