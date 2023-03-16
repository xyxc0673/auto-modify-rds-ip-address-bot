import axios, { AxiosResponse } from 'axios';

function sendFeishuHook(
  token: string,
  content: string
): Promise<AxiosResponse> {
  const url = `https://open.feishu.cn/open-apis/bot/v2/hook/${token}`; // 替换为你自己的飞书机器人 hook 地址
  const data = {
    msg_type: 'text',
    content: {
      text: content,
    },
  };

  return axios.post(url, data);
}

export { sendFeishuHook };
