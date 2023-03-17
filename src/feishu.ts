import axios, { AxiosResponse } from 'axios';

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

async function sendFeishuHook(
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

export { generateFeishuUrl, createFeishuData, sendFeishuHook };
