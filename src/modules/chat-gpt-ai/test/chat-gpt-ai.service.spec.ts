import { Test, TestingModule } from '@nestjs/testing';
import { ChatGptAiService } from '../chat-gpt-ai.service';
import { getPgTestTypeTrmModule } from '@root/common/config/get-pg-test-type-trm-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGPTReport } from '@root/modules/chat-gpt-ai/entities/chat-gpt-ai.entity';

describe('ChatGptAiService', () => {
  let service: ChatGptAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getPgTestTypeTrmModule(), TypeOrmModule.forFeature([ChatGPTReport])],
      providers: [ChatGptAiService],
    }).compile();

    service = module.get<ChatGptAiService>(ChatGptAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
