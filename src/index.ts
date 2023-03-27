import { checkIpAddress, sendPublicIpAddress } from './checkIp';
import cron from 'node-cron';

const startCheckIp = async (): Promise<void> => {
  cron.schedule('*/5 * * * *', async () => {
    checkIpAddress();
  });
  cron.schedule('5 9 * * *', async () => {
    sendPublicIpAddress();
  });
};

startCheckIp();
