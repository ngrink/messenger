-- CreateTable
CREATE TABLE "unread_messages" (
    "userId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,

    CONSTRAINT "unread_messages_pkey" PRIMARY KEY ("userId","chatId","messageId")
);
