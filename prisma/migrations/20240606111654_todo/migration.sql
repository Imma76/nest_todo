-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_id_fkey";

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
