import { checkIpAddress, sendPublicIpAddress } from './checkIp';
import cron from 'node-cron';
import { sendFeishuHook } from './feishu';

const startCheckIp = async (): Promise<void> => {
  cron.schedule('*/5 * * * *', async () => {
    try {
      checkIpAddress();
    } catch (error) {
      sendFeishuHook(
        'RDS 安全组白名单 IP 更新机器人5分钟定时检查报错：${error}'
      );
    }
  });
  cron.schedule('5 9 * * *', async () => {
    try {
      sendPublicIpAddress();
    } catch (error) {
      sendFeishuHook(
        'RDS 安全组白名单 IP 更新机器人每日 IP 提醒报错：${error}'
      );
    }
  });
};

startCheckIp();
