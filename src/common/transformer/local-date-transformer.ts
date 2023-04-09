import { LocalDate } from 'js-joda';
import { ValueTransformer } from 'typeorm';
import { DateTimeUtil } from '@root/common/util/date-time.util';

export class LocalDateTransformer implements ValueTransformer {
  // domain -> db로 넣을때
  to(entityValue: LocalDate): Date {
    return DateTimeUtil.toDate(entityValue);
  }

  // db -> entity로 가져올때
  from(databaseValue: Date): LocalDate {
    return DateTimeUtil.toLocalDate(databaseValue);
  }
}
