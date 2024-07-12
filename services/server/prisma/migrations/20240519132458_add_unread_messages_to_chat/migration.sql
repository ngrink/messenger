-- AddForeignKey
ALTER TABLE "unread_messages" ADD CONSTRAINT "unread_messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
