import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import background1 from '../assets/background1.png';
import playerImg from '../assets/player-start-1.png';
import playerProfileImg from '../assets/player-start-profile.png';

import npc1_1 from '../assets/npc1-1.png'; 
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
import background2_1 from '../assets/background2-1.png';

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
  padding: 20px;
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
  letter-spacing: -0.2rem;
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
  justify-content: center;
  padding: 0 80px; 
  gap: 550px;
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

const PrologPage = () => {
  const [step, setStep] = useState(1);
  const [currentLine, setCurrentLine] = useState(0);
  const [battlePhase, setBattlePhase] = useState<'intro' | 'idle' | 'attack'>('intro');
  
  // 1. 처음 시작할 때도 랜덤 이미지 하나 설정
  const [currentNpcImage, setCurrentNpcImage] = useState(() => Math.random() < 0.5 ? npc1_1 : npc1_2);

  const PLAYER_MAX_HP = 100000;
  const ENEMY_MAX_HP = 50000;

  const [playerHp, setPlayerHp] = useState(100000);
  const [enemyHp, setEnemyHp] = useState(50000);

  const playerHpPercent = (playerHp / PLAYER_MAX_HP) * 100;
  const enemyHpPercent = (enemyHp / ENEMY_MAX_HP) * 100;

  const playerAttackLines = [
    '사랑의 멋짐을 모르는 당신은 불쌍해요..!',
    '인간이 다섯 명이나 모이면 말이야… 반드시 한 명 쓰레기가 있다',
    '샤랄라 꿈꿔 왔던 내 모습 마법 소녀로 변신',
    '후루룩 짭짭 펑! 푸딩 폭풍 스윗 푸딩 블라스트',
    '착한 마음으로 물들어라 ',
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
    { speaker: 'player', situation: 'story', text: '학교가 사라지면 내가 좀 편해질까?' },
    { speaker: 'sebaschan', situation: 'story', text: '내가 도와줄까?' },
    { speaker: 'player', situation: 'story', text: '세바스찬? 말을 하는 세바스찬?' },
    { speaker: 'sebaschan', situation: 'story', text: '나는 세바스찬. 너의 말을 듣고 너를 도와주기 위해서 나타났어.' },
    { speaker: 'player', situation: 'story', text: '왜? 뭔가 수호령 같은 존재 아니었어? 왜 날 도와주려는 거야?' },
    { speaker: 'sebaschan', situation: 'story', text: '아니. 난 지금 학교에 불만이 많아. 왜냐하면 내 형제들이 맨날 미림의 부실한 관리로 인해서 왜가리들에게 먹혔다고..!' },
    { speaker: 'sebaschan', situation: 'story', text: '난 그런 학교를 용서 할 수 없어. 너를 도와줄게.' },
    { speaker: 'sebaschan', situation: 'story', text: '자 이건 선물이야. 이걸 이용하면 학교를 폭파시키는데 도움이 될 거야. 마법소녀로 변신할 수 있어.' },
    { speaker: 'player', situation: 'story', text: '마법소녀? 그 애니에서만 나오던 거??' },
    { speaker: 'sebaschan', situation: 'story', text: '변신 주문은 “치링치링 샤랄라 나날이 예뻐지는 나. 너무나도 소중해”라고 마법봉을 들고 외치면 돼!' },
    { speaker: 'player', situation: 'speak', text: '치링치링 샤랄라 나날이 예뻐지는 나. 너무나도 소중해' },
    { speaker: 'player', situation: 'story', text: '뭐야 교복에서 빛이 나잖아!' },
    { speaker: 'sebaschan', situation: 'story', text: '맞아. 이제 넌 마법소녀의 힘을 얻었어. 이 힘으로 학교를 폭파 시키자!' },
    { speaker: 'player', situation: 'story', text: '알겠어! 가보자!' },
  ];

  const speakerConfig = {
    player: {
      name: 'Player',
      profile: playerProfileImg,
    },
    sebaschan: {
      name: '세바스찬',
      profile: npc_profile1,
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
  const currentSpeaker = speakerConfig[currentDialogue.speaker];

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
        const victoryIdx = dialogues.findIndex(d => d.situation === 'victory');
        if (victoryIdx !== -1) setCurrentLine(victoryIdx);
        setBattlePhase('idle');
      } else if (playerHp <= 0) {
        const defeatIdx = dialogues.findIndex(d => d.situation === 'defeat');
        if (defeatIdx !== -1) setCurrentLine(defeatIdx);
        setBattlePhase('idle');
      }
    }
  }, [enemyHp, playerHp, isBattle, dialogues]);

  const handleNextDialogue = () => {
    if (step !== 2) return;
    
    // 2. 클릭할 때마다 NPC 이미지 랜덤 변경
    setCurrentNpcImage(Math.random() < 0.5 ? npc1_1 : npc1_2);
  
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
  
    if (currentLine < dialogues.length - 1) {
      setCurrentLine(currentLine + 1);
    }
  };

  const showMic = isSpeak || (isBattle && battlePhase === 'attack');
  const showDialogueBox = !isBattle || (isBattle && battlePhase !== 'idle');

  return (
    <Container $bg={background1} onClick={handleNextDialogue}>
      <GlobalStyle />
      {isBattle && (
        <BattleHUD>
          <HpBarWrapper style={{ textAlign: 'left' }}>
            <HpBarBg>
              <EnemyhpBarFill $hp={enemyHpPercent} />
            </HpBarBg>
            <HpName>윤지&진하T</HpName>
          </HpBarWrapper>

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
      {step === 1 && (  
        <IntroOverlay>
          <IntroText>점심시간 정원 앞</IntroText>
        </IntroOverlay> 
      )}

      {step === 2 && (
        <>
          <StandingCharacter
            src={isBattle ? playerbattle1 : playerImg}
            alt="Character"
          />
          {/* 3. State에 저장된 랜덤 이미지 사용 */}
          <NpcCharacter2 src={currentNpcImage} alt="Character"/>      
          {showDialogueBox && (
          <DialogueSection>
            <ProfileWrapper>
              <ProfileInner>
                <ProfileImage src={currentSpeaker.profile} alt="Profile" />
              </ProfileInner>
            </ProfileWrapper>

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

export default PrologPage;