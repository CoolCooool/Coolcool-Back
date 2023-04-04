// eslint-disable-next-line import/no-extraneous-dependencies
import { ValueTransformer } from 'typeorm';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LocalDateTime } from 'js-joda';
import { DateTimeUtil } from '@root/common/util/DateTimeUtil';

export class LocalDateTimeTransformer implements ValueTransformer {
  to(entityValue: LocalDateTime): Date {
    return DateTimeUtil.toDate(entityValue);
  }

  from(databaseValue: Date): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(databaseValue);
  }
}
