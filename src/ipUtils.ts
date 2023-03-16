import fs from 'fs';
import path from 'path';
import axios from 'axios';

const ipFilePath = path.join(__dirname, 'ip.txt');

async function getPublicIpAddress(): Promise<string> {
  console.log('正在从 https://api-ipv4.ip.sb/ip 获取 Public IP');
  const url = 'https://api-ipv4.ip.sb/ip';
  const response = await axios.get(url);
  return response.data.trim();
}

function saveIpAddressToFile(ipAddress: string): void {
  fs.writeFile(ipFilePath, ipAddress, (error) => {
    if (error) {
      console.error('Error saving IP address to file:', error);
    } else {
      console.log(`IP 地址已保存到文件：${ipAddress}`);
    }
  });
}

function readIpAddressFromFile(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (fs.existsSync(ipFilePath)) {
      fs.readFile(ipFilePath, (error, data) => {
        if (error) {
          console.error('Error reading IP address from file:', error);
          reject(error);
        } else {
          const currentIp = data.toString().trim();
          resolve(currentIp);
          console.log(`读取到上次保存的 IP 地址：${currentIp}`);
        }
      });
    } else {
      fs.writeFileSync(ipFilePath, '');
    }
  });
}

export { getPublicIpAddress, saveIpAddressToFile, readIpAddressFromFile };
