-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "photo" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
