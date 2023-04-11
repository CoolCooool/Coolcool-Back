import { Injectable } from '@nestjs/common';
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { CreateChatGptAiDto } from '@root/modules/chat-gpt-ai/dto/create-chat-gpt-ai.dto';

const DEFAULT_MODEL_ID = 'text-davinci-003';

@Injectable()
export class ChatGptAiService {
  private readonly openAiApi: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      organization: 'org-VEJFhPQbMuJcUTMF3RzrQGsZ',
      apiKey: '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',
    });

    this.openAiApi = new OpenAIApi(configuration);
  }

  async getModelAnswer(data: CreateChatGptAiDto) {
    try {
      const params: CreateCompletionRequest = {
        prompt: data.query,
        model: DEFAULT_MODEL_ID,
        temperature: 0.9,
        max_tokens: 2048,
      };

      const response = await this.openAiApi.createCompletion(params);

      console.log(response.data);
      return response.data;
    } catch (error) {}
  }
}
