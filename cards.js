/**
 * ==========================================
 * 🃏 바보게임 카드 미션 데이터베이스 (cards.js)
 * ==========================================
 * 
 * [카드 미션 추가/수정 가이드]
 * 1. 카드를 추가하려면 CARD_DB 객체 내부에 새로운 코드를 키값으로 하는 항목을 만드세요.
 *    예시:
 *    'R-013': { emoji: '🤫', name: '귓속말 금지', desc: '모든 대화는 들리게 해야 합니다. 귓속말 시 벌점!', type: 'common' }
 * 
 * 2. 속성 설명:
 *    - emoji: 카드에 표시될 아이콘(이모지)
 *    - name: 카드의 이름 (제목)
 *    - desc: 카드 미션에 대한 상세 설명 규칙
 *    - type: 카드의 종류 (아래의 타입 중 하나여야 합니다)
 *      * 'common': 공통카드 (초록색 테두리)
 *      * 'team': 팀별카드 (빨간색 테두리)
 *      * 'special': 특수카드 (보라색 테두리)
 */

const CARD_DB = {};

// 기존 5개 이미지에 대한 정보 사전 정의 (동적 이미지가 우선이므로 비워둡니다)
const PREDEFINED_DESCS = {};

// 기본 폴백(Fallback) 이미지 목록 생성기 (GitHub Pages 등 정적 서버 환경용)
function getFallbackImages(prefix, count) {
  const list = [];
  for (let i = 1; i <= count; i++) {
    list.push(`${prefix}-${String(i).padStart(2, '0')}.jpg`);
  }
  return list;
}

async function loadDynamicCards() {
  // 기존 CARD_DB 키 제거
  for (let key in CARD_DB) {
    delete CARD_DB[key];
  }

  // 1. 팀별 카드 로딩
  let files = [];
  try {
    const res = await fetch('/api/team-images');
    if (res.ok) {
      files = await res.json();
    } else {
      files = getFallbackImages('team', 63);
    }
  } catch (err) {
    files = getFallbackImages('team', 63);
  }

  files.forEach((file, index) => {
    const id = `T-${String(index + 1).padStart(3, '0')}`;
    const num = index + 1;
    let cardColor = 'orange';
    if (num <= 31) {
      cardColor = 'orange';
    } else if (num <= 61) {
      cardColor = 'blue';
    } else {
      cardColor = 'gray';
    }
    CARD_DB[id] = {
      code: id,
      searchKey: `team-${num} team${num} ${num}`,
      emoji: '🃏',
      name: `팀 미션 ${String(num).padStart(2, '0')}`,
      desc: `카드를 열어 이미지에 지정된 팀별 미션 행동을 수행하세요.`,
      type: 'team',
      color: cardColor,
      image: `images/${file}`
    };
  });

  // 2. 공통 카드 로딩 (64번 ~ 71번)
  let filesCommon = [];
  try {
    const resCommon = await fetch('/api/common-images');
    if (resCommon.ok) {
      filesCommon = await resCommon.json();
    } else {
      filesCommon = getFallbackImages('common', 8);
    }
  } catch (err) {
    filesCommon = getFallbackImages('common', 8);
  }

  filesCommon.forEach((file, index) => {
    const cardNum = 63 + index + 1;
    const id = `T-${String(cardNum).padStart(3, '0')}`;
    CARD_DB[id] = {
      code: id,
      searchKey: `team-${cardNum} team${cardNum} common-${index + 1} common${index + 1}`,
      emoji: '📢',
      name: `공통 미션 ${String(cardNum).padStart(2, '0')}`,
      desc: `카드를 열어 이미지에 지정된 공통 미션 행동을 수행하세요.`,
      type: 'common',
      image: `images/${file}`
    };
  });

  // 3. 특수 카드 로딩 (72번 ~ 74번)
  let filesSpecial = [];
  try {
    const resSpecial = await fetch('/api/special-images');
    if (resSpecial.ok) {
      filesSpecial = await resSpecial.json();
    } else {
      filesSpecial = getFallbackImages('special', 3);
    }
  } catch (err) {
    filesSpecial = getFallbackImages('special', 3);
  }

  filesSpecial.forEach((file, index) => {
    const id = `S-${String(index + 1).padStart(3, '0')}`;
    const cardNum = 63 + filesCommon.length + index + 1;
    CARD_DB[id] = {
      code: id,
      searchKey: `team-${cardNum} team${cardNum} special-${index + 1} special${index + 1} ${cardNum}`,
      emoji: '🌟',
      name: `특수 미션 ${String(cardNum).padStart(2, '0')}`,
      desc: `카드를 열어 이미지에 지정된 특수 미션 행동을 수행하세요.`,
      type: 'special',
      image: `images/${file}`
    };
  });

  // 4. 예시 카드 로딩 (4장)
  let filesExample = [];
  try {
    const resExample = await fetch('/api/example-images');
    if (resExample.ok) {
      filesExample = await resExample.json();
    } else {
      filesExample = getFallbackImages('example', 4);
    }
  } catch (err) {
    filesExample = getFallbackImages('example', 4);
  }

  const EXAMPLE_DESCS = {
    1: { emoji: '🤠', name: '예시: 유희왕 최고!', desc: '모든 팀은 카드를 내려놓을 때 "유희왕 최고"를 외쳐야 합니다!' },
    2: { emoji: '🎵', name: '예시: 바보 노래 부르기', desc: '카드를 내려놓을 때마다 "띠리리리리띠리~" (바보노래부르기)를 외쳐야 합니다.' },
    3: { emoji: '👉', name: '예시: 동작그만!', desc: '다른팀이 카드를 들고 있을때 "동작그만!"을 외치고, 손으로 총모양을 만들어야 합니다.' },
    4: { emoji: '📜', name: '예시: 다음 학기도 유희왕', desc: '카드를 뽑기 전 "다음 학기도 유희왕 하겠습니다"를 외쳐야 합니다.' },
  };

  filesExample.forEach((file, index) => {
    const num = index + 1;
    const id = `E-${String(num).padStart(3, '0')}`;
    const info = EXAMPLE_DESCS[num] || {
      emoji: '💡',
      name: `예시 미션 ${String(num).padStart(2, '0')}`,
      desc: '카드를 열어 이미지에 지정된 예시 미션 행동을 수행하세요.'
    };

    CARD_DB[id] = {
      code: id,
      searchKey: `example-${num} example${num} 예시-${num} 예시${num}`,
      emoji: info.emoji,
      name: info.name,
      desc: info.desc,
      type: 'example',
      image: `images/${file}`
    };
  });
}

/**
 * 카드 종류별 스타일 메타데이터
 */
const TYPE_META = {
  example: { label: '예시카드', color: '#D35400', bg: '#FDEBD0' },
  common: { label: '공통카드', color: '#155724', bg: '#D4EDDA' },
  team: { label: '팀별카드', color: '#721C24', bg: '#F8D7DA' },
  team_orange: { label: '주황 팀별카드', color: '#A04000', bg: '#FDEBD0' },
  team_blue: { label: '파란 팀별카드', color: '#0A369D', bg: '#D2E4FC' },
  team_gray: { label: '회색 팀별카드', color: '#495057', bg: '#E9ECEF' },
  special: { label: '특수카드', color: '#5A2C85', bg: '#E8D8F8' },
};
