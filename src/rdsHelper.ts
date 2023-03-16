import axios from 'axios';
import * as signature from './sign';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';

const env = dotenv.config().parsed ?? {};

// 修改以下参数
const accessKeyId = env.ALIYUN_ACCESS_KEY_ID;
const accessKeySecret = env.ALIYUN_ACCESS_KEY_SECRET;
const dbInstanceId = env.ALIYUN_DB_INSTANCE_ID;

function generateRandomString(length: number): string {
  return crypto.randomBytes(length).toString('hex');
}

const updateWhitelist = (ip: string): Promise<any> => {
  const securityIps = ip;

  const timestamp = new Date().toISOString().substring(0, 19) + 'Z';

  const signatureNonce = generateRandomString(10);

  // 构造请求参数
  const params: Record<string, string> = {
    Format: 'JSON',
    Version: '2014-08-15',
    AccessKeyId: accessKeyId,
    SignatureMethod: 'HMAC-SHA1',
    Timestamp: timestamp,
    SignatureVersion: '1.0',
    SignatureNonce: signatureNonce,
    Action: 'ModifySecurityIps',
    DBInstanceId: dbInstanceId,
    SecurityIps: securityIps,
    DBInstanceIPArrayName: 'update_by_robot',
  };

  // 计算签名并添加到请求参数中;
  params.Signature = signature.sign('GET', '/', params, accessKeySecret);

  // 发送请求
  return axios
    .get('https://rds.aliyuncs.com/', { params: params })
    .then((response) => response.data);
};

export { updateWhitelist };
