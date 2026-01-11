import React, { useState, useEffect } from 'react';
import styled,{ keyframes } from 'styled-components';
import background2 from '../assets/background2.png';
import playerImg from '../assets/player-start-1.png';
import playerProfileImg from '../assets/player-start-profile.png';
import npc2_1 from '../assets/npc2-1.png';
import npc2_2 from '../assets/npc2-2.png';
import npc2_3 from '../assets/npc2-3.png';
import npc1_2 from '../assets/npc1-2.png';
import npc_profile1 from '../assets/npc-profile1.png';
import npc_profile2 from '../assets/npc-profile2.png';
import npc_profile3 from '../assets/npc-profile3.png';
import npc_profile4 from '../assets/npc-profile4.png';
import { createGlobalStyle } from 'styled-components';
import mic from '../assets/mic.png';
import playerbattle1 from '../assets/player-change-1.png';
import playerbattle2 from '../assets/player-change-2.png';
import playerbattle3 from '../assets/player-change-3.png';
import background2_1 from '../assets/background2-1.png'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Cafe24ClassicType';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Cafe24ClassicType-Regular.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(0.3);
    opacity: 0.8;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
`;


const Container = styled.div<{ $bg: string }>`
  width: 100vw;
  height: 100vh;
  background-image: url(${props => props.$bg});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const IntroOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroText = styled.h1`
  color: white;
  font-size: 3rem;
`;

const StandingCharacter = styled.img`
  position: absolute;
  bottom: 0;
  right: 10%;
  height: 85%;
  z-index: 5;
`;
const NpcCharacter2 = styled.img`
  position: absolute;
  bottom: 0;
  left: 10%;
  height: 85%;
  z-index: 0;
`;

const DialogueSection = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  display: flex;
  align-items: stretch;
  z-index: 10;
`;

const ProfileWrapper = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 5px;
  background: linear-gradient(54deg, #FF7CF2 -28.84%, #FFF583 91.73%);
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-right: 10px;
  box-sizing: border-box;
`;

const ProfileInner = styled.div`
  width: 100%;
  height: 100%;
  padding:20px;
  background-color: rgba(255, 255, 255, 0.2);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box; 
`;

const ProfileImage = styled.img<{ $scale?: number }>`
  width: 100%;
  height: 100%;
  transform: scale(${props => props.$scale ?? 1});
`;

const MessageBox = styled.div`
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.2);
  border: 6px solid;
  border-image-source: linear-gradient(to right, #FFF583, #FF7CF2);
  border-image-slice: 1;
  padding: 30px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NameTag = styled.div`
  letter-spacing : -0.2rem;
  position: absolute;
  top: -70px;
  left: 0;
  padding: 3px 26px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #FF27AC;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #FFF583;
  font-family: "Cafe24 ClassicType";
  font-size: 40px;  
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  span {
    color: yellow;
  }
`;

const DialogueText = styled.div<{ $speak: boolean }>`
  font-size: ${({ $speak }) =>
    $speak ? '2rem' : '1.5rem'};
  color: ${({ $speak }) =>
    $speak ? '#FFF583' : 'white'};
  line-height: 1.4;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: ${({ $speak }) =>
    $speak ? "'Cafe24ClassicType'" : 'inherit'};
`;
const SpeakOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  pointer-events: none;
`;
const MicCircle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(
    180deg,
    #FF9A3B 0%,
    #FF27AC 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  box-shadow: 0 0 25px rgba(255, 0, 150, 0.8);
`;

const MicImage = styled.img`
  width: 80px;
  height: 80px;
`;
const PulseRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 105, 180, 0.4);
  animation: ${pulse} 1.6s ease-out infinite;
`;
const PulseRingDelay = styled(PulseRing)`
  animation-delay: 0.8s;
`;

const SpeakMicWrapper = styled.div`
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BattleHUD = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-center;
  padding: 0 80px; 
  gap:550px;
  z-index: 30;
`;
const HpBarWrapper = styled.div`
  width: 360px;
`;

const HpName = styled.div`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 6px;
`;

const HpBarBg = styled.div`
  width: 100%;
  height: 36px;
  background: #FFF;
  border: 2px solid black;
  overflow: hidden;  
`;

const PlayerhpBarFill = styled.div<{ $hp: number }>`
  width: ${({ $hp }) => $hp}%;
  height: 100%;
  background: linear-gradient(90deg, #FF9D8C 0%, #FC33A9 100%);
  transition: width 0.4s ease;
`;
const EnemyhpBarFill = styled.div<{ $hp: number }>`
  width: ${({ $hp }) => $hp}%;
  height: 100%;
  background: linear-gradient(90deg, #FF6344 0%, #FFF583 100%);
  transition: width 0.4s ease;
`;
const VictorySpecialOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  color: white;
  text-align: center;
  font-family: 'Cafe24ClassicType';
`;

const VictoryTitle = styled.div`
  font-size: 80px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const VictorySubTitle = styled.div`
  font-size: 30px;
`;

// --- 스타일 정의 수정 (기존 코드 덮어쓰기) ---

// 패배 전체 배경 (어두운 정도 유지)
const DefeatSpecialOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  letter-spacing : -3px;
  align-items: center;
  z-index: 200;
  color: white;
  text-align: center;
`;

// "패배" 타이틀 (효과 제거, 더 진하고 선명하게)
const DefeatTitle = styled.div`
  font-size: 85px; /* 크기 약간 키움 */
  font-weight: 900; /* 훨씬 두껍게 */
  color: #FF1B1B; /* 더 진하고 강렬한 빨간색 */
  margin-bottom: 15px;
`;

// "다시 플레이 하시겠습니까?" (깔끔하게 유지)
const DefeatSubTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 200px; /* 버튼과 간격 넓힘 */
`;

// 버튼 컨테이너 (간격 조정)
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column; /* 사진처럼 세로로 배치 */
  gap: 25px; /* 버튼 사이 간격 */
  width: 100%;
  align-items: center;
`;

// 버튼 공통 스타일 (사진처럼 넓고 납작하게)
const DefeatButton = styled.button`
  width: 400px; /* 훨씬 넓게 */
  height: 85px; /* 높이는 적당히 */
  font-size: 34px;
  font-weight: bold;
  border: none;
  border-radius: 10px; /* 모서리 둥글기 줄임 */
  cursor: pointer;
  color: white;
  transition: filter 0.2s; /* 클릭 시 밝기 변화 */

`;

// '예' 버튼 (사진 같은 분홍색 그라데이션)
const YesButton = styled(DefeatButton)`
  background: linear-gradient(267deg, #F70492 0.36%, #FF9AD5 100%);
`;

// '아니오' 버튼 (사진 같은 붉은색 그라데이션)
const NoButton = styled(DefeatButton)`
  background: linear-gradient(87deg, #F70492 0%, #FF1B1B 100%);
`;

// --- 스타일 정의 수정 끝 ---

const ComputerLabPage = () => {
  const [step, setStep] = useState(1);
  const [currentLine, setCurrentLine] = useState(0);
  const [battlePhase, setBattlePhase] = useState<'intro' | 'idle' | 'attack'>('intro');

  const PLAYER_MAX_HP = 100000;
  const ENEMY_MAX_HP = 50000;

  const [playerHp, setPlayerHp] = useState(0);
  const [enemyHp, setEnemyHp] = useState(50000);

  const [currentBg, setCurrentBg] = useState(background2);
  const [showVictoryEffect, setShowVictoryEffect] = useState(false);

  const [showDefeatEffect, setShowDefeatEffect] = useState(false);


  const playerHpPercent = (playerHp / PLAYER_MAX_HP) * 100;
  const enemyHpPercent = (enemyHp / ENEMY_MAX_HP) * 100;

  const playerAttackLines = [
    '사랑의 멋짐을 모르는 당신은 불쌍해요..!',
    '인간이 다섯 명이나 모이면 말이야… 반드시 한 명 쓰레기가 있다',
    '샤랄라 꿈꿔 왔던 내 모습 마법 소녀로 변신',
    '후루룩 짭짭 펑! 푸딩 폭풍 스윗 푸딩 블라스트',
    '착한 마음으로 물들어라	',
    '거대한 탐욕이여, 너의 본색을 드러내라!',
    '잃어버린 양심을 되찾아 줄 희망의 빛이여!',
    '화염을 부르는 마법! 파이너셜 파이어스톰 테러!',
    '니코니코 웃음, 마음을 환하게! 러브 스마일, 러브 웨이브!',
    '혼란의 마음에 고요한 안식을 소울 캄 캡슐 라이트!',
    '빛나는 별의 장막을 펼쳐줄래? 하이 톤 갤럭시 스크린!',
    ];

  const dialogues: {
    speaker: SpeakerKey;
    situation: string;
    text: string; 
  }[] = [
    { speaker: 'yoonjiT', situation: 'story', text: '미림아 어디를 다녀온거야?' },
    { speaker: 'player', situation: 'story', text: '선생님 전 이 학교를 폭파시킬 겁니다.' },
    { speaker: 'jinhaT', situation: 'story', text: '헛소리하지 말고 앉아라.' },
    { speaker: 'player', situation: 'story', text: '선생님, 전 지금 마법소녀의 힘을 얻었어요 이 힘으로 학교를 폭파시키겠습니다!' },
    { speaker: 'yoonjiT', situation: 'story', text: '미림아.. 요즘 힘든 건 알겠는데, 어디가 아픈거니?' },
    { speaker: 'player', situation: 'story', text: '선생님들 절 막으신다면 전 선생님들을 쓰러트리는 수 밖에 없어요' },
    { speaker: 'sebaschan', situation: 'story', text: '마법소녀로 변신하자! 이제 밑에 나오는 대사를 외치면 돼!' },
    { speaker: 'player', situation: 'speak', text: '치링치링 샤랄라 나날이 예뻐지는 나. 너무나도 소중해!' },
    { speaker: 'sebaschan', situation: 'battle', text: '이제 공격하자! 대사를 따라 외쳐봐!!' },
    { speaker: 'teachers', situation: 'defeat', text: '진도 나가야 해. 빨리 자리에 앉아' },
    { speaker: 'teachers', situation: 'victory', text: '알겠어. 말리지 않을게' },
    { speaker: 'sebaschan', situation: 'victory', text: '좋아 이제 다른 곳을 가자!' },
  ];

  const isLastLine = currentLine === dialogues.length - 1;

  const speakerConfig = {
    player: {
      name: 'Player',
      profile: playerProfileImg,
    },
    yoonjiT: {
      name: '김윤지 선생님',
      profile: npc_profile2,
    },
    jinhaT: {
      name: '임진하 선생님',
      profile: npc_profile3,
    },
    sebaschan: {
      name: '세바스찬',
      profile: npc_profile1,
    },
    teachers: {
      name: '임진하&김윤지 선생님',
      profile: npc_profile4,
    },
  } as const;

  type SpeakerKey = keyof typeof speakerConfig; 

  const currentDialogue = dialogues[currentLine];
  const isSpeak = currentDialogue.situation === 'speak';
  const isBattle = currentDialogue.situation === 'battle';
  const [battleLine, setBattleLine] = useState('');

  const getRandomBattleLine = () => {
    const random =
      playerAttackLines[
        Math.floor(Math.random() * playerAttackLines.length)
      ];
    setBattleLine(random);
  };

  if (!currentDialogue) return null;

  const currentSpeaker = (isBattle && battlePhase === 'attack') 
    ? speakerConfig.player 
    : speakerConfig[currentDialogue.speaker];

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(2);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isBattle) {
      getRandomBattleLine();
    }
  }, [isBattle]);

  useEffect(() => {
    if (isBattle) {
      if (enemyHp <= 0) {
        // 적 체력이 0일 때: 'victory' 상황의 첫 번째 대사 인덱스 찾기
        const victoryIdx = dialogues.findIndex(d => d.situation === 'victory');
        if (victoryIdx !== -1) setCurrentLine(victoryIdx);
        setBattlePhase('idle'); // 배틀 페이즈 초기화
      } else if (playerHp <= 0) {
        // 플레이어 체력이 0일 때: 'defeat' 상황의 첫 번째 대사 인덱스 찾기
        const defeatIdx = dialogues.findIndex(d => d.situation === 'defeat');
        if (defeatIdx !== -1) setCurrentLine(defeatIdx);
        setBattlePhase('idle');
      }
    }
  }, [enemyHp, playerHp, isBattle]);

  const handleNextDialogue = () => {
    // 1. 인트로 단계이거나 승리/패배 연출 중에는 클릭 방지
    if (step !== 2 || showVictoryEffect || showDefeatEffect) return;
  
    // 2. 패배 대사 체크: 현재 대사가 패배 상황이면 클릭 시 오버레이를 띄우고 중단
    if (currentDialogue.situation === 'defeat') {
      setShowDefeatEffect(true);
      return; // 더 이상 currentLine이 증가하지 않도록 여기서 종료합니다.
    }
  
    // 3. 승리 특수 연출 체크: 선생님의 승리 확정 대사인지 확인
    const isTeachersLastWords = 
      currentDialogue.speaker === 'teachers' && 
      currentDialogue.situation === 'victory' &&
      currentDialogue.text === '알겠어. 말리지 않을게';
  
    if (isTeachersLastWords) {
      setCurrentBg(background2_1); // 배경 변경
      setShowVictoryEffect(true);  // 블러 및 문구 표시
  
      setTimeout(() => {
        setShowVictoryEffect(false); 
        setCurrentLine(prev => prev + 1); // 2초 후 다음 대사(세바스찬)로 이동
      }, 2000); 
      return;
    }
  
    // 4. 배틀 상황일 때의 클릭 로직
    if (isBattle) {
      if (battlePhase === 'intro') {
        setBattlePhase('idle');
        return;
      }
  
      if (battlePhase === 'idle') {
        getRandomBattleLine();
        setBattlePhase('attack');
        return;
      }
  
      if (battlePhase === 'attack') {
        setEnemyHp(prev => Math.max(0, prev - 10000));
        setBattlePhase('idle');
        return;
      }
    }
  
    // 5. 일반 대사 흐름 로직
    if (currentLine < dialogues.length - 1) {
      setCurrentLine(prev => prev + 1);
    }
  };

  const showMic = isSpeak || (isBattle && battlePhase === 'attack');
  const showDialogueBox = !isBattle || (isBattle && battlePhase !== 'idle');

  return (
    <Container $bg={currentBg} onClick={handleNextDialogue}>
      <GlobalStyle />
      {isBattle && (
        <BattleHUD>
          {/* 왼쪽 체력바 (적) */}
          <HpBarWrapper style={{ textAlign: 'left' }}>
            <HpBarBg>
            <EnemyhpBarFill $hp={enemyHpPercent} />
            </HpBarBg>
            <HpName>윤지&진하T</HpName>
          </HpBarWrapper>

          {/* 오른쪽 체력바 (플레이어) */}
          <HpBarWrapper style={{ textAlign: 'right' }}>
            <HpBarBg>
            <PlayerhpBarFill $hp={playerHpPercent} />
            </HpBarBg>
            <HpName>Player</HpName>
          </HpBarWrapper>
        </BattleHUD>
      )}
      {showMic && <SpeakOverlay />}
      {showMic && (
        <SpeakMicWrapper>
          <PulseRing />
          <PulseRingDelay />
          <MicCircle>
            <MicImage src={mic} alt="mic" />
          </MicCircle>
        </SpeakMicWrapper>
      )}
      {/* STEP 1: 인트로 */}
      {step === 1 && (  
        <IntroOverlay>
          <IntroText>실습실</IntroText>
        </IntroOverlay> 
      )}

      {showVictoryEffect && (
          <VictorySpecialOverlay>
            <VictoryTitle>성공</VictoryTitle>
            <VictorySubTitle>실습실이 폭파되었다!</VictorySubTitle>
          </VictorySpecialOverlay>
        )}
        {showDefeatEffect && (
          <DefeatSpecialOverlay>
            <DefeatTitle>패배</DefeatTitle>
            <DefeatSubTitle>다시 플레이 하시겠습니까?</DefeatSubTitle>
            <ButtonContainer>
              {/* '예' 버튼 클릭 시 페이지를 새로고침하거나 상태를 초기화하는 함수를 연결하세요 */}
              <YesButton>예</YesButton>
              <NoButton onClick={() => console.log("종료")}>아니오</NoButton>
            </ButtonContainer>
          </DefeatSpecialOverlay>
        )}

      {/* STEP 2: 대화창 */}
      {step === 2 && !showVictoryEffect && (
        <>
          {!isLastLine && (
            <StandingCharacter
              src={isBattle ? playerbattle1 : playerImg}
              alt="Player"
            />
          )}
          <NpcCharacter2 
            src={isLastLine ? npc1_2 : npc2_1} 
            alt="NPC" 
          />   
          {showDialogueBox && (
          <DialogueSection>
            {/* 좌측 프로필 */}
            <ProfileWrapper>
              <ProfileInner>
                <ProfileImage src={currentSpeaker.profile} alt="Profile" />
              </ProfileInner>
            </ProfileWrapper>

            {/* 우측 대화창 */}
            <MessageBox>
              <NameTag>
                {currentSpeaker.name}
              </NameTag>

              <DialogueText $speak={showMic}>
                {isBattle 
                  ? (battlePhase === 'attack' ? battleLine : currentDialogue.text)
                  : currentDialogue.text
                }
              </DialogueText>
            </MessageBox>
          </DialogueSection>
        )}
        </>
      )}
    </Container>
  );
};

export default ComputerLabPage; 
