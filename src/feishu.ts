import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';

const env = dotenv.config().parsed ?? {};

interface FeishuData {
  msg_type: string;
  content: {
    text: string;
  };
}

function generateFeishuUrl(token: string): string {
  return `https://open.feishu.cn/open-apis/bot/v2/hook/${token}`;
}

function createFeishuData(content: string): FeishuData {
  return {
    msg_type: 'text',
    content: {
      text: content,
    },
  };
}

async function _sendFeishuHook(
  token: string,
  content: string
): Promise<AxiosResponse> {
  const url = generateFeishuUrl(token);
  const data = createFeishuData(content);

  try {
    return await axios.post(url, data);
  } catch (error) {
    throw error;
  }
}

async function sendFeishuHook(content: string): Promise<AxiosResponse> {
  return _sendFeishuHook(env.FEISHU_WEBHOOK_TOKEN, content);
}

export { generateFeishuUrl, createFeishuData, sendFeishuHook, _sendFeishuHook };
