import { PageOptionsDto } from './page-options.dto';
import { Transformer } from 'src/common/transformer';

export class PageDto<T> {
  readonly page: number;
  readonly itemsPerPage: number;
  readonly total: number;

  constructor(readonly items: T[], meta: PageMetaDto) {
    this.page = meta.page;
    this.itemsPerPage = meta.itemsPerPage;
    this.total = meta.total;
  }

  transform<O>(transformer: Transformer<T, O>): PageDto<O> {
    return new PageDto<O>(
      this.items.map(transformer.transform),
      new PageMetaDto(new PageOptionsDto(), this.total)
    );
  }
};

export class PageMetaDto {
  readonly page: number;
  readonly itemsPerPage: number;
  readonly total: number;

  constructor(pageOptionsDto: PageOptionsDto, total: number) {
    this.page = pageOptionsDto.page;
    this.itemsPerPage = pageOptionsDto.itemsPerPage;
    this.total = total;
  }
}
