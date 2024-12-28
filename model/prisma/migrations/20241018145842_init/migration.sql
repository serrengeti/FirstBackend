-- CreateTable
CREATE TABLE "Todo" (
    "todo_id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("todo_id")
);
