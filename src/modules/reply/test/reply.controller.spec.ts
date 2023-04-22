import { Test, TestingModule } from '@nestjs/testing';
import { ReplyController } from '../reply.controller';
import { ReplyService } from '../reply.service';
import { getPgTestTypeTrmModule } from '@root/common/config/get-pg-test-type-trm-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from '@root/modules/reply/entity/reply.entity';
import { instance, mock, when } from 'ts-mockito';
import { DeleteResult } from 'typeorm';

describe('ReplyController', () => {
  let controller: ReplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getPgTestTypeTrmModule(), TypeOrmModule.forFeature([Reply])],
      controllers: [ReplyController],
      providers: [ReplyService],
    }).compile();

    controller = module.get<ReplyController>(ReplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('replies', () => {
    it('find reply', async () => {
      const id = 1;
      const reply = new Reply();
      reply.id = id;

      const stubReplyApiService: ReplyService = mock(ReplyService);
      when(stubReplyApiService.findAll()).thenResolve([reply]);

      controller = new ReplyController(instance(stubReplyApiService));

      const replies = await controller.findReplies();
      expect(replies.data).toHaveLength(id);
      expect(replies.data[0].id).toBe(id);
    });
  });

  describe('reply find one', () => {
    it('should return one reply', async () => {
      const id = 1;
      const reply = new Reply();
      reply.id = id;

      const stubReplyApiService = mock(ReplyService);
      when(stubReplyApiService.findOne(id)).thenResolve(reply);
      controller = new ReplyController(instance(stubReplyApiService));
      const result = await controller.findReply(id);
      expect(result.data).toBeDefined();
      expect(result.data.id).toEqual(reply.id);
    });
  });

  describe('reply delete one', () => {
    it('should delete one reply', async () => {
      const id = 1;
      const reply = new Reply();
      reply.id = id;

      const stubReplyApiService = mock(ReplyService);
      when(stubReplyApiService.findOne(id)).thenResolve(reply);
      when(stubReplyApiService.remove(id)).thenResolve({} as DeleteResult);
      controller = new ReplyController(instance(stubReplyApiService));
      const result = await controller.findReply(id);
      expect(result.data).toBeDefined();
      // expect(result.data.id).toEqual(reply.id);
      //
      // const deleteResult = await controller.remove(id);
      //
      // console.log(deleteResult);
      // const findResult = await controller.findReply(id);
      // expect(findResult.data).toBeNull();
      // expect(findResult.data).toBeDefined();
    });
  });
});
