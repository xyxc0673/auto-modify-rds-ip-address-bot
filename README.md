# auto-modify-rds-ip-address-bot

A bot to check if public ip has been changed and update to Aliyun's rds security ip

## Features

- Get public IP address from IP API and storing it in local
- Modify Aliyun rds if local IP is different from public IP
- Send feishu hook to notify changes

## Development

```bash
git clone https://github.com/xyxc0673/auto-modify-rds-ip-address-bot
cd auto-modify-rds-ip-address-bot
pnpm install
mv .env.example .env // then fill your information
```

## IP APIs

> Note: The IP API should only return raw IP address

- https://api-ipv4.ip.sb/ip
- https://ip.42.pl/raw
