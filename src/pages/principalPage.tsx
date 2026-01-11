import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

// --- 이미지 Import (경로: ../assets) ---
import background4 from '../assets/background4.png';      // 평소 교장실
import background4_1 from '../assets/background4-1.png';  // 폭파된 교장실

import playerImg from '../assets/player-start-1.png';
import playerProfileImg from '../assets/player-start-profile.png';

// 교장선생님 이미지
import npc4_1 from '../assets/npc4-1.png'; // 평상시
import npc4_2 from '../assets/npc4-2.png'; // 전투 태세
import npc4_3 from '../assets/npc4-3.png'; // 데미지 입음

// 프로필
import npc_profile1 from '../assets/npc-profile1.png'; // 세바스찬
import npc_profile6 from '../assets/npc-profile6.png'; // 교장선생님

// 기타 리소스
import mic from '../assets/mic.png';
import playerbattle1 from '../assets/player-change-1.png'; // 변신 후

// --- 스타일 정의 ---
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

const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const pulse = keyframes`
  0% { transform: scale(0.3); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
`;

const Container = styled.div<{ $bg: string; $isExploded: boolean }>`
  width: 100vw;
  height: 100vh;
  background-image: url(${props => props.$bg});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  ${props => props.$isExploded && css`
    animation: ${shake} 0.5s infinite;
  `}
`;

const StandingCharacter = styled.img`
  position: absolute;
  bottom: 0;
  right: 10%;
  height: 85%;
  z-index: 5;
  transition: all 0.3s ease;
`;

const NpcCharacter = styled.img`
  position: absolute;
  bottom: 0;
  left: 10%;
  height: 85%;
  z-index: 4;
`;

// 대화창 관련 스타일
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const ProfileInner = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MessageBox = styled.div`
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.7);
  border: 6px solid;
  border-image-source: linear-gradient(to right, #FFF583, #FF7CF2);
  border-image-slice: 1;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NameTag = styled.div`
  position: absolute;
  top: -70px;
  left: 0;
  color: #FF27AC;
  -webkit-text-stroke: 2px #FFF583;
  font-family: "Cafe24 ClassicType";
  font-size: 40px;
`;

const DialogueText = styled.div<{ $speak: boolean }>`
  font-size: 2rem;
  color: ${({ $speak }) => ($speak ? '#FFF583' : 'white')};
  font-family: "Cafe24 ClassicType";
  line-height: 1.4;
`;

// 전투 HUD
const BattleHUD = styled.div`
  position: absolute;
  top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 100px;
  z-index: 30;
`;

const HpBarWrapper = styled.div`
  width: 400px;
`;

const HpName = styled.div`
  color: white;
  font-size: 1.5rem;
  font-family: 'Cafe24 ClassicType';
  margin-bottom: 5px;
  text-shadow: 2px 2px 4px black;
`;

const HpBarBg = styled.div`
  width: 100%;
  height: 30px;
  background: white;
  border: 3px solid black;
`;

const HpFill = styled.div<{ $hp: number; $isEnemy?: boolean }>`
  width: ${({ $hp }) => $hp}%;
  height: 100%;
  background: ${({ $isEnemy }) => 
    $isEnemy 
      ? 'linear-gradient(90deg, #FF6344, #FFF583)' 
      : 'linear-gradient(90deg, #FF9D8C, #FC33A9)'};
  transition: width 0.3s ease;
`;

// 마이크/공격 오버레이
const SpeakOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 15;
  pointer-events: none;
`;

const SpeakMicWrapper = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PulseRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 105, 180, 0.4);
  animation: ${pulse} 1.6s ease-out infinite;
`;

const MicCircle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(180deg, #FF9A3B, #FF27AC);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 25px rgba(255, 0, 150, 0.8);
`;

// [수정된 엔딩 화면 스타일]
const EndingScreen = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7); // 화면 어둡게 통일
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // animation: fadein ... 제거 (애니메이션 없음)
`;

const EndingTitle = styled.h1`
  font-size: 5rem;
  color: white;
  margin-bottom: 40px;
  font-family: 'Cafe24 ClassicType';
`;

const EndingButton = styled.button`
  width: 421px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  font-size: 2rem;
  font-family: 'Cafe24 ClassicType';
  
  // 핑크색 버튼 스타일
  background: #FFC0CB; 
  color: #FF27AC; 
  
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);

  &:hover {
    transform: scale(1.05);
  }
`;

// --- 메인 컴포넌트 ---
const PrincipalPage = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isBattle, setIsBattle] = useState(false);
  const [battlePhase, setBattlePhase] = useState<'idle' | 'attack'>('idle');
  const [isTransformed, setIsTransformed] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'victory_end' | 'defeat_end'>('playing');

  // HP 설정
  const PLAYER_MAX = 50000;
  const ENEMY_MAX = 150000; 
  const [playerHp, setPlayerHp] = useState(PLAYER_MAX);
  const [enemyHp, setEnemyHp] = useState(ENEMY_MAX);

  // 데미지 입는 순간을 표시하기 위한 상태
  const [isHit, setIsHit] = useState(false);

  // 대사 데이터
  const dialogues = [
    { speaker: 'system', text: '교장실로 이동한다.' },
    { speaker: 'principal', text: '어? 미림 학생 아닌가요? 이곳까지 올 줄은 몰랐네요.' },
    { speaker: 'player', text: '저도요. 전 이제 멈출 생각이 없습니다.' },
    { speaker: 'principal', text: '지금이라도 돌아가면 아무 일도 없던 걸로 하겠습니다.' },
    { speaker: 'sebaschan', text: '미림아 변신하자!' },
    { speaker: 'player', text: '치링치링 샤랄라 나날이 예뻐지는 나. 너무나도 소중해!', action: 'transform' },
    // 전투 시작
    { speaker: 'sebaschan', text: '미림아 확실히 교장선생님이셔서 그런지 힘이 남달라! 이길 수 있어!', situation: 'battle_intro' },
    // 전투 중 (HUD 표시)
    { speaker: 'battle', text: '(전투 진행 중...)' },
    // 승리
    { speaker: 'principal', text: '당신이 폭파시키고 싶다면.. 그게 학교의 운명이겠죠', situation: 'victory' },
    { speaker: 'sebaschan', text: '좋았어 이제 학교를 폭파 시킬 수 있어!' },
    { speaker: 'sebaschan', text: '고생했어 미림아! 이제 마법으로 학교를 폭파 시킬 수 있어' },
    { speaker: 'player', text: '좋았어 학교를 폭파 시키자!', action: 'explode' },
    { speaker: 'system', text: '이제 학교는 미림이의 의해서 폭파되었다. 그렇다... 미림이와 세바스찬은 자신들의 꿈을 이뤘다', situation: 'victory_final' },
    // 패배
    { speaker: 'system', text: '미림이의 변신이 풀린다', situation: 'defeat' },
    { speaker: 'principal', text: '미림학생의 자리는 이곳이 아닙니다 돌아가세요' },
    { speaker: 'principal', text: '이 힘은 가져가도록 하겠습니다', situation: 'defeat_final' },
  ];

  const speakerConfig: any = {
    player: { name: '미림이', profile: playerProfileImg },
    principal: { name: '교장선생님', profile: npc_profile6 },
    sebaschan: { name: '세바스찬', profile: npc_profile1 },
    system: { name: '', profile: null },
    battle: { name: '', profile: null },
  };

  const currentDialogue = dialogues[currentLine];
  const currentSpeaker = speakerConfig[currentDialogue.speaker];

  // 효과음/이펙트 처리
  useEffect(() => {
    if (currentDialogue.action === 'transform') {
      setIsTransformed(true);
      setIsBattle(true);
    }
    if (currentDialogue.action === 'explode') {
      setIsExploded(true);
    }
    if (currentDialogue.situation === 'battle_intro') {
      setIsBattle(true);
    }
    if (currentDialogue.situation === 'defeat') {
      setIsTransformed(false);
      setIsBattle(false);
    }
  }, [currentLine, currentDialogue]);

  // HP 감시
  useEffect(() => {
    if (isBattle && gameState === 'playing') {
      if (enemyHp <= 0) {
        const victoryIndex = dialogues.findIndex(d => d.situation === 'victory');
        setCurrentLine(victoryIndex);
        setIsBattle(false);
      } else if (playerHp <= 0) {
        const defeatIndex = dialogues.findIndex(d => d.situation === 'defeat');
        setCurrentLine(defeatIndex);
        setIsBattle(false);
      }
    }
  }, [enemyHp, playerHp, isBattle, gameState]);

  // 클릭 핸들러
  const handleScreenClick = () => {
    if (gameState !== 'playing') return;

    // 전투 중 로직
    if (isBattle && currentDialogue.situation !== 'battle_intro') {
      if (battlePhase === 'idle') {
        // 마이크 띄우기
        setBattlePhase('attack');
      } else {
        // [공격 발생!]
        // 1. 적 HP 감소
        setEnemyHp(prev => Math.max(0, prev - 15000));
        
        // 2. 데미지 입은 모션(4-3) 발동
        setIsHit(true);
        setTimeout(() => {
          setIsHit(false); // 0.8초 뒤 다시 원래대로
        }, 800);

        setBattlePhase('idle');
      }
      return;
    }

    // 엔딩 트리거
    if (currentDialogue.situation === 'victory_final') {
      setGameState('victory_end');
      return;
    }
    if (currentDialogue.situation === 'defeat_final') {
      setGameState('defeat_end');
      return;
    }

    // 대사 넘기기
    if (currentLine < dialogues.length - 1) {
      setCurrentLine(prev => prev + 1);
    }
  };

  const goHome = () => window.location.reload(); 

  const showMic = isBattle && battlePhase === 'attack';
  const showHUD = isBattle;
  const isSystemMsg = currentDialogue.speaker === 'system';

  // [이미지 로직]
  let displayNpc = npc4_1;
  if (isHit) {
    displayNpc = npc4_3;
  } else if (isBattle) {
    displayNpc = npc4_2;
  }

  const displayPlayer = isTransformed ? playerbattle1 : playerImg;
  const currentBackground = isExploded ? background4_1 : background4;

  return (
    <Container 
      $bg={currentBackground} 
      $isExploded={isExploded}
      onClick={handleScreenClick}
    >
      <GlobalStyle />

      {/* [수정됨] 패배 엔딩 화면 */}
      {gameState === 'defeat_end' && (
        <EndingScreen>
          <EndingTitle>END</EndingTitle>
          <EndingButton onClick={goHome}>처음으로 돌아가기</EndingButton>
        </EndingScreen>
      )}

      {/* [수정됨] 승리 엔딩 화면 */}
      {gameState === 'victory_end' && (
        <EndingScreen>
          <EndingTitle>END</EndingTitle>
          <EndingButton onClick={goHome}>처음으로 돌아가기</EndingButton>
        </EndingScreen>
      )}

      {/* HUD */}
      {showHUD && (
        <BattleHUD>
          <HpBarWrapper>
            <HpName>교장선생님</HpName>
            <HpBarBg>
              <HpFill $hp={(enemyHp / ENEMY_MAX) * 100} $isEnemy={true} />
            </HpBarBg>
          </HpBarWrapper>
          <HpBarWrapper style={{ textAlign: 'right' }}>
            <HpName>미림이</HpName>
            <HpBarBg>
              <div style={{width: '100%', height:'100%', display:'flex', justifyContent:'flex-end'}}>
                <HpFill $hp={(playerHp / PLAYER_MAX) * 100} />
              </div>
            </HpBarBg>
          </HpBarWrapper>
        </BattleHUD>
      )}

      {/* NPC 렌더링 */}
      {!isExploded && (
        <NpcCharacter src={displayNpc} alt="Principal" />
      )}

      {/* 플레이어 렌더링 */}
      {!isExploded && (
        <StandingCharacter src={displayPlayer} alt="Mirim" />
      )}

      {/* 마이크 */}
      {showMic && <SpeakOverlay />}
      {showMic && (
        <SpeakMicWrapper>
          <PulseRing />
          <MicCircle>
            <img src={mic} alt="Attack" width="80" />
          </MicCircle>
        </SpeakMicWrapper>
      )}

      {/* 대화창 */}
      {(!isBattle || battlePhase === 'idle') && gameState === 'playing' && (
        <DialogueSection>
          {!isSystemMsg && currentSpeaker && (
            <ProfileWrapper>
              <ProfileInner>
                <ProfileImage src={currentSpeaker.profile} alt="Profile" />
              </ProfileInner>
            </ProfileWrapper>
          )}

          <MessageBox>
            {!isSystemMsg && currentSpeaker && (
              <NameTag>{currentSpeaker.name}</NameTag>
            )}
            <DialogueText $speak={false}>
              {currentDialogue.text}
            </DialogueText>
          </MessageBox>
        </DialogueSection>
      )}
    </Container>
  );
};

export default PrincipalPage;