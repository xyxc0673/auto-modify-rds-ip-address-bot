import axios from 'axios';
import * as signature from './sign';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';

const env = dotenv.config().parsed ?? {};

const accessKeyId = env.ALIYUN_ACCESS_KEY_ID;
const accessKeySecret = env.ALIYUN_ACCESS_KEY_SECRET;
const dbInstanceId = env.ALIYUN_DB_INSTANCE_ID;

if (!accessKeyId || !accessKeySecret || !dbInstanceId) {
  throw new Error('ALIYUN_ACCESS_KEY_ID, ALIYUN_ACCESS_KEY_SECRET, or ALIYUN_DB_INSTANCE_ID is undefined');
}

function generateRandomString(length: number): string {
  return crypto.randomBytes(length).toString('hex');
}

function createParams(ip: string, timestamp: string, signatureNonce: string): Record<string, string> {
  return {
    Format: 'JSON',
    Version: '2014-08-15',
    AccessKeyId: accessKeyId,
    SignatureMethod: 'HMAC-SHA1',
    Timestamp: timestamp,
    SignatureVersion: '1.0',
    SignatureNonce: signatureNonce,
    Action: 'ModifySecurityIps',
    DBInstanceId: dbInstanceId,
    SecurityIps: ip,
    DBInstanceIPArrayName: 'update_by_robot',
  };
}

const updateWhitelist = async (ip: string): Promise<any> => {
  const timestamp = new Date().toISOString().substring(0, 19) + 'Z';
  const signatureNonce = generateRandomString(10);
  const params = createParams(ip, timestamp, signatureNonce);

  params.Signature = signature.sign('GET', '/', params, accessKeySecret);

  try {
    const response = await axios.get('https://rds.aliyuncs.com/', { params: params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { updateWhitelist };
