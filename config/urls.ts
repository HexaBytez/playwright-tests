
const ENV = (process.env.ENV as 'prod' | 'test') || 'test';

const urls = {
  prod: 'https://prod-url.com',
  test: 'https://test-aqa.demo.case.one/',
};

export const BASE_URL = urls[ENV];
