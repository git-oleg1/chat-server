import { Inject, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { CHATS_REPOSITORY } from 'src/common/constants';
import { WhereOptions } from 'sequelize';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto, PageMetaDto } from 'src/common/dto/page.dto';

@Injectable()
export class ChatService {
  constructor(
    @Inject(CHATS_REPOSITORY)
    private repository: typeof Chat,
  ) {}

  create(createChatDto: CreateChatDto) {
    return this.repository.create(createChatDto);
  }

  async findAll(pageOptions: PageOptionsDto): Promise<PageDto<Chat>> {
    const { rows, count } = await this.repository.findAndCountAll({
      offset: pageOptions.skip,
      limit: pageOptions.itemsPerPage,
    });

    const meta = new PageMetaDto(pageOptions, count);

    return new PageDto<Chat>(rows, meta);
  }

  findOne(options: WhereOptions<Chat>): Promise<Chat> {
    return this.repository.findOne({ where: options });
  }

  findByPk(id: number): Promise<Chat> {
    return this.repository.findByPk(id);
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    const chat = await this.findByPk(id);
    chat.set(updateChatDto);
    return await chat.save();
  }

  async remove(id: number): Promise<boolean> {
    const n = await this.repository.destroy({ where: { id } });
    return n === 1;
  }
}
