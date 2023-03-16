import fs from 'fs';
import dotenv from 'dotenv';
import * as rdsHelper from './rdsHelper';
import { sendFeishuHook } from './feishu';
import {
  getPublicIpAddress,
  saveIpAddressToFile,
  readIpAddressFromFile,
} from './ipUtils';

const env = dotenv.config().parsed ?? {};

async function checkIpAddress(): Promise<void> {
  const storedIp = await readIpAddressFromFile();
  const publicIp = await getPublicIpAddress();

  if (publicIp !== storedIp) {
    const ipChangedMsg = `测试系统 IP 地址变更为：${publicIp}，正在更新 RDS 安全组白名单`;
    console.log(ipChangedMsg);

    try {
      await rdsHelper.updateWhitelist(publicIp);
      saveIpAddressToFile(publicIp);
      const updatedMsg = `RDS 安全组白名单测试系统 IP 地址已变更为：${publicIp}`;
      sendFeishuHook(env.FEISHU_WEBHOOK_TOKEN, updatedMsg);
    } catch (error) {
      const errorMsg = `RDS 安全组白名单测试系统 IP 地址变更失败, 错误：${error}`;
      sendFeishuHook(env.FEISHU_WEBHOOK_TOKEN, errorMsg);
    }
  } else {
    console.log('IP 地址未改变');
  }
}

export { checkIpAddress };
