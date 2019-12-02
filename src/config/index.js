export default {
  // API: 'https://api.madaomall.com/uni-lamp', // 生产地址
  // API: 'https://api.madaomall.com/uni-lamp-dev', // 测试地址
  // API: 'http://192.168.10.12:3000/mock/79', // mock js api地址
  // API: 'http://192.168.10.123:8092', // 张小庆
  API: process.env.NODE_ENV === 'development' ? 'https://dev.api.com/' : 'https://api.com/', // 生产地址
  LOG: process.env.NODE_ENV === 'development', // dev环境打印log
  version: '1.0.0',
  // 各平台独立参数
  platform: {
    'mp-alipay': {
      type: 0
    },
    'mp-touiao': {
      type: 1
    },
    'mp-weixin': {
      type: 2
    }
  }
}
