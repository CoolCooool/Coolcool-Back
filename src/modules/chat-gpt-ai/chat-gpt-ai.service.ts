import { Injectable } from '@nestjs/common';
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';

const DEFAULT_MODEL_ID = 'text-davinci-003';

@Injectable()
export class ChatGptAiService {
  private readonly openAiApi: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      organization: 'YOUR_ORGANIZATION_ID',
      apiKey: 'YOUR_API_KEY',
    });

    this.openAiApi = new OpenAIApi(configuration);
  }

  async getModelAnswer(question: string) {
    try {
      const params: CreateCompletionRequest = {
        prompt: question,
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
