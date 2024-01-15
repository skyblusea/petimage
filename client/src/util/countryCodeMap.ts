
const countryToLocaleMap = {
  'KR': 'ko-KR',
  'US': 'en-US',
  'JP': 'ja-JP',
  'CN': 'zh-CN',
} as const 

export type CountryCode = keyof typeof countryToLocaleMap;

const countryToCurrencyMap = {
  'KR': 'KRW',
  'US': 'USD',
  'JP': 'JPY',
  'CN': 'CNY',
};


function countryCodeMap (countryCode: CountryCode) {
  return {
    locale: countryToLocaleMap[countryCode],
    currency: countryToCurrencyMap[countryCode],
  };
}

export default countryCodeMap;