import { Card } from '@shared';

const AWARD_DATA = [
  {
    id: 1,
    subtitle: '데이터',
    title: '100MB',
    description: '유효기간: 2026.12.20',
    buttonText: '데이터 사용하기',
  },
  {
    id: 2,
    subtitle: '메가커피',
    title: '아메리카노(ICE)',
    description: '유효기간: 2026.12.20',
    buttonText: '기프티콘 보기',
  },
  {
    id: 3,
    subtitle: 'CU',
    title: '5,000원권',
    description: '유효기간: 2026.12.20',
    buttonText: '기프티콘 보기',
  },
];

const AwardPage = () => {
  return (
    <div className="m-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {AWARD_DATA.map((item) => (
          <Card
            key={item.id}
            subtitle={item.subtitle}
            title={item.title}
            description={item.description}
            buttonText={item.buttonText}
          />
        ))}
      </div>
    </div>
  );
};

export default AwardPage;
