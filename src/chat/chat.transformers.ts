import { Transformer } from 'src/common/transformer';
import { Chat } from './entities/chat.entity';

export class PlaygroundChatTransformer implements Transformer<Chat> {
  transform(input: Chat) {
    return {
      id: input.id,
      name: input.name,
      createdAt: input.createdAt,
    };
  }
}
