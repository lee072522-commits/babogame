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

const CARD_DB = {
  // ── 공통 카드 (common) ──
  'R-001': { emoji: '🚫', name: '"네/아니오" 금지', desc: '이 두 단어를 말하면 즉시 벌점!', type: 'common' },
  'R-002': { emoji: '😂', name: '웃음 참기', desc: '소리 내어 웃거나 크게 미소 지으면 벌점', type: 'common' },
  'R-003': { emoji: '👉', name: '손가락질 금지', desc: '손가락으로 사람이나 물건을 가리키면 벌점', type: 'common' },
  'R-004': { emoji: '🤔', name: '추임새 금지', desc: '"음","어","그" 같은 추임새를 넣으면 벌점', type: 'common' },
  'R-005': { emoji: '🙅', name: '고개짓 금지', desc: '끄덕이거나 가로젓는 행동 금지', type: 'common' },
  'R-006': { emoji: '🔢', name: '숫자 말하기 금지', desc: '숫자(하나,둘,1,2…)를 말하면 벌점', type: 'common' },
  'R-007': { emoji: '📛', name: '이름 부르기 금지', desc: '상대방의 이름을 직접 말하면 벌점', type: 'common' },
  'R-008': { emoji: '🤐', name: '"바보" 금지', desc: '"바보" 또는 "멍청이"를 말하면 내가 벌점', type: 'common' },
  'R-009': { emoji: '👏', name: '박수 금지', desc: '어떤 상황에서도 박수를 치면 벌점', type: 'common' },
  'R-010': { emoji: '⏱', name: '3초 후 대답', desc: '질문을 받으면 반드시 3초 후에만 대답 가능', type: 'common' },
  'R-011': { emoji: '🎵', name: '노래·흥얼거림 금지', desc: '흥얼거리거나 노래하면 즉시 벌점', type: 'common' },
  'R-012': { emoji: '📱', name: '왼손 사용 금지', desc: '무언가를 잡거나 들 때 왼손을 사용하면 벌점', type: 'common' },

  // ── 특수 카드 (special) ──
  'A-001': { emoji: '🔄', name: '순서 반전', desc: '이번 라운드 차례가 반대 방향으로 바뀝니다', type: 'special' },
  'A-002': { emoji: '⏭', name: '차례 건너뛰기', desc: '다음 플레이어의 차례가 즉시 건너뜁니다', type: 'special' },
  'A-003': { emoji: '🔀', name: '자리 바꾸기', desc: '운영진이 지정하는 두 플레이어가 자리를 교환합니다', type: 'special' },
  'A-004': { emoji: '🎯', name: '지목 챌린지', desc: '한 플레이어를 지목해 즉흥 미션을 내릴 수 있습니다', type: 'special' },
  'A-005': { emoji: '🤫', name: '침묵 타임', desc: '30초 동안 모두 말할 수 없습니다. 말하면 벌점!', type: 'special' },
  'B-001': { emoji: '✨', name: '면죄부', desc: '이 카드를 받은 플레이어는 벌점 1개를 없앨 수 있습니다', type: 'special' },
  'B-002': { emoji: '🛡', name: '규칙 면제', desc: '이번 라운드 1회에 한해 규칙을 어겨도 벌점 없음', type: 'special' },
  'B-003': { emoji: '👑', name: '바보왕 선포', desc: '현재 벌점이 가장 많은 사람에게 "바보왕" 왕관을 씌웁니다', type: 'special' },

  // ── 팀별 카드 (team) ──
  'P-001': { emoji: '🎤', name: '노래 한 소절', desc: '운영진이 지정한 노래를 한 소절 불러야 합니다', type: 'team' },
  'P-002': { emoji: '🤸', name: '만세 10번', desc: '자리에서 일어나 만세를 10번 외쳐야 합니다', type: 'team' },
  'P-003': { emoji: '😤', name: '벌점 2배', desc: '이번 라운드 내 벌점이 2배로 적용됩니다', type: 'team' },
};

/**
 * 카드 종류별 스타일 메타데이터
 */
const TYPE_META = {
  common: { label: '공통카드', color: '#155724', bg: '#D4EDDA' },
  team: { label: '팀별카드', color: '#721C24', bg: '#F8D7DA' },
  special: { label: '특수카드', color: '#5A2C85', bg: '#E8D8F8' },
};
