import { Transformer } from 'src/common/transformer';
import { User } from './entities/user.entity';

export class PlaygroundUserTransformer implements Transformer<User> {
  transform(input: User) {
    return {
      id: input.id,
      email: input.email,
      password: input.password,
      name: input.name,
      createdAt: input.createdAt,
    };
  }
}
