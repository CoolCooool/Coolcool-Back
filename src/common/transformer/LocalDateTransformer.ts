// eslint-disable-next-line import/no-extraneous-dependencies
import { LocalDate } from 'js-joda';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ValueTransformer } from 'typeorm';
import { DateTimeUtil } from '@root/common/util/DateTimeUtil';

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
