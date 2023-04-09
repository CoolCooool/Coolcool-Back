import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { LocalDateTime } from 'js-joda';
import { DateTimeUtil } from '@root/common/util/date-time.util';
import { Transform } from 'class-transformer';

export abstract class BaseTimeEntity {
  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: false })
  updatedDate: Date;

  getCreateDate(): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(this.createdDate);
  }

  getUpdatedDate(): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(this.updatedDate);
  }
}
