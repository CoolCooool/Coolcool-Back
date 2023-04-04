// eslint-disable-next-line import/no-extraneous-dependencies
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { LocalDateTime } from 'js-joda';
import { DateTimeUtil } from '@root/common/util/DateTimeUtil';

export abstract class BaseTimeEntity {
  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  updatedDate: Date;

  getCreateDate(): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(this.createDate);
  }

  getUpdatedDate(): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(this.updatedDate);
  }
}
