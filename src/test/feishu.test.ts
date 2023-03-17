// Import required modules and functions for testing
import { expect } from 'chai';
import { sendFeishuHook, createFeishuData, generateFeishuUrl } from '../feishu';
import axios, { AxiosError } from 'axios';
import sinon from 'sinon';

// Describe the test suite for Feishu functions
describe('Feishu Functions', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('generateFeishuUrl should return correct URL', () => {
    const token = 'testToken';
    const expectedUrl = `https://open.feishu.cn/open-apis/bot/v2/hook/${token}`;
    expect(generateFeishuUrl(token)).to.equal(expectedUrl);
  });

  it('createFeishuData should return correct data structure', () => {
    const content = 'testContent';
    const expectedData = {
      msg_type: 'text',
      content: {
        text: content,
      },
    };
    expect(createFeishuData(content)).to.deep.equal(expectedData);
  });

  it('sendFeishuHook should send a request to the correct URL with correct data', async () => {
    const token = 'testToken';
    const content = 'testContent';
    const url = generateFeishuUrl(token);
    const data = createFeishuData(content);

    const axiosPostStub = sinon.stub(axios, 'post').resolves({ status: 200 });

    await sendFeishuHook(token, content);

    expect(axiosPostStub.calledOnceWith(url, data)).to.be.true;
  });

  it('sendFeishuHook should throw an error if the request fails', async () => {
    const token = 'testToken';
    const content = 'testContent';
    const errorMessage = 'Request failed';

    sinon.stub(axios, 'post').rejects(new Error(errorMessage));

    try {
      await sendFeishuHook(token, content);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.message).to.equal(errorMessage);
      }
    }
  });
});
