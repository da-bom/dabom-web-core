export const REWARD_PRODUCT = [
  {
    id: 1,
    type: 'DATA',
    imgUrl: null,
    productName: '100MB',
    price: 1000,
  },
  {
    id: 2,
    type: 'DATA',
    imgUrl: null,
    productName: '300MB',
    price: 3000,
  },
  {
    id: 3,
    type: 'GIFTICON',
    imgUrl: 'https://example.com/images/mega-coffee.png',
    productName: '메가커피 아메리카노(ICE)',
    price: 3000,
  },
  {
    id: 4,
    type: 'GIFTICON',
    imgUrl: 'https://example.com/images/momstouch.png',
    productName: '맘스터치 싸이버거 세트',
    price: 5000,
  },
] as const;

export const REWARD_HISTORY = [
  {
    id: 1,
    phoneNumber: '01012345678',
    status: '사용',
    productName: '메가커피 아메리카노(ICE)',
    mission: '안마하기',
    couponNumber: '12345865675',
    issuedAt: '2026-10-04T00:00:00.000Z',
    expiredAt: '2026-10-04T23:59:59.999Z',
  },
  {
    id: 2,
    phoneNumber: '01012345678',
    status: '미사용',
    productName: '홍루이젠 햄샌드위치',
    mission: '간식 안 먹기',
    couponNumber: '12345345865',
    issuedAt: '2026-10-04T00:00:00.000Z',
    expiredAt: '2026-10-04T23:59:59.999Z',
  },
  {
    id: 3,
    phoneNumber: '01012345678',
    status: '만료',
    productName: '메가커피 아메리카노(ICE)',
    mission: '유튜브 30분만 보기',
    couponNumber: '12345865345',
    issuedAt: '2026-01-04T00:00:00.000Z',
    expiredAt: '2026-01-04T23:59:59.999Z',
  },
] as const;
