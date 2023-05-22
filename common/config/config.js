const COLOUR = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

const SERVER = {
  port: 2050,
  assest_url: '',
  BASE_URL: '/api',
};

const OTP_SPEC = {
  limit: 4,
  digits: '0123456789'
}

const SECURITY = {
  JWT_SECRET: '123@2b',
  API_KEY: '753951456852'
};

class Config {
  constructor() {
    this.SERVER = SERVER;
    this.COLOUR = COLOUR;
    this.SECURITY = SECURITY;
    this.OTP_SPEC = OTP_SPEC;
  }
}

module.exports = { Config: new Config() };
