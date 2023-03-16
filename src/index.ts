import { checkIpAddress } from './checkIp';
import cron from 'node-cron';

const startCheckIp = async (): Promise<void> => {
  cron.schedule('*/5 * * * *', async () => {
    checkIpAddress();
  });
};

startCheckIp();
