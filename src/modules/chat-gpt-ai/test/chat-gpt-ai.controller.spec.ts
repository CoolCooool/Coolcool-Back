import { Test, TestingModule } from '@nestjs/testing';
import { ChatGptAiController } from '../chat-gpt-ai.controller';
import { ChatGptAiService } from '../chat-gpt-ai.service';
import { getPgTestTypeTrmModule } from '@root/common/config/get-pg-test-type-trm-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGPTReport } from '@root/modules/chat-gpt-ai/entities/chat-gpt-ai.entity';

describe('ChatGptAiController', () => {
  let controller: ChatGptAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getPgTestTypeTrmModule(), TypeOrmModule.forFeature([ChatGPTReport])],
      controllers: [ChatGptAiController],
      providers: [ChatGptAiService],
    }).compile();

    controller = module.get<ChatGptAiController>(ChatGptAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
