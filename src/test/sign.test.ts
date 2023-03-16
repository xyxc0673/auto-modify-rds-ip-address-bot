import assert from 'assert';
import { describe, it } from 'mocha';
import { sign } from '../sign';

describe('sign', () => {
  it('should sign correctly', () => {
    const method: string = 'GET';
    const path: string = '/';
    const params: { [key: string]: string } = {
      AccessKeyId: 'testid',
      Action: 'DescribeDBInstances',
      Format: 'XML',
      RegionId: 'region1',
      SignatureMethod: 'HMAC-SHA1',
      SignatureNonce: 'NwDAxvLU6tFE0DVb',
      SignatureVersion: '1.0',
      Timestamp: '2013-06-01T10:33:56Z',
      Version: '2014-08-15',
    };
    const secret: string = 'testsecret';

    const expected: string = 'jSgwMBJz7IHnP7lPLu8NeibG7Y4=';
    const actual: string = sign(method, path, params, secret);

    assert.equal(actual, expected);
  });
});
