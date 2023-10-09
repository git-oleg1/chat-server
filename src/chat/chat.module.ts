import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { chatsProviders } from './chat.providers';

@Module({
  providers: [ChatGateway, ChatService, ...chatsProviders,],
  exports: [ChatService,]
})
export class ChatModule {}
