import { Injectable } from '@nestjs/common';
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { CreateChatGptAiDto } from '@root/modules/chat-gpt-ai/dto/create-chat-gpt-ai.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatGPTReport } from '@root/modules/chat-gpt-ai/entities/chat-gpt-ai.entity';
import { Repository } from 'typeorm';
import { UpdateChatGptAiDto } from '@root/modules/chat-gpt-ai/dto/update-chat-gpt-ai.dto';

const DEFAULT_MODEL_ID = 'text-davinci-003';

@Injectable()
export class ChatGptAiService {
  private readonly openAiApi: OpenAIApi;

  constructor(
    @InjectRepository(ChatGPTReport)
    private readonly ChatGPTReportRepository: Repository<ChatGPTReport>,
  ) {
    const configuration = new Configuration({
      organization: 'org-VEJFhPQbMuJcUTMF3RzrQGsZ',
      apiKey: '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',
    });

    this.openAiApi = new OpenAIApi(configuration);
  }

  async findAll() {
    return this.ChatGPTReportRepository.find();
  }

  async findById(id: number) {
    return this.ChatGPTReportRepository.find({ where: { userId: id } });
  }

  async createModelAnswer(createchatGPTAiDto: CreateChatGptAiDto) {
    try {
      const params: CreateCompletionRequest = {
        prompt: createchatGPTAiDto.query,
        model: DEFAULT_MODEL_ID,
        temperature: 0.9,
        max_tokens: 2048,
      };

      // chatGPT 답변 response
      const response = await this.openAiApi.createCompletion(params);

      const chatGPTReport: ChatGPTReport = new ChatGPTReport();
      chatGPTReport.query = createchatGPTAiDto.query;
      chatGPTReport.userId = createchatGPTAiDto.userId;
      chatGPTReport.answer = response.data.choices[0].text;
      chatGPTReport.isDeleted = false;

      console.log(response.data);
      return await this.ChatGPTReportRepository.insert(chatGPTReport);
    } catch (error) {}
  }

  async softDelete(id: number) {
    await this.ChatGPTReportRepository.update(id, { isDeleted: true });
  }

  async update(id: number, updateChatGptAiDto: UpdateChatGptAiDto) {
    try {
      const params: CreateCompletionRequest = {
        prompt: updateChatGptAiDto.query,
        model: DEFAULT_MODEL_ID,
        temperature: 0.9,
        max_tokens: 2048,
      };
      const response = await this.openAiApi.createCompletion(params);
      updateChatGptAiDto.answer = response.data.choices[0].text;
      console.log(response.data);
      return await this.ChatGPTReportRepository.update(id, updateChatGptAiDto);
    } catch (error) {}
  }
}
