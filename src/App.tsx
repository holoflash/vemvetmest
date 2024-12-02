import { useState, useEffect } from 'react';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';
import EndScreen from './EndScreen';
import questionsData from './questions.json';
import questionsDataEN from './questions.en.json';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  Question: string;
  option_1: Option;
  option_2: Option;
  option_3: Option;
  option_4: Option;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return array.slice().sort(() => Math.random() - 0.5);
}

const encodeIndices = (indices: number[]): string => {
  return btoa(indices.join(','));
};

const decodeIndices = (encoded: string): number[] => {
  return atob(encoded).split(',').map(Number);
};

const App = () => {
  const [name, setName] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(10);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setGameOver] = useState(false);
  const [language, setLanguage] = useState<'sv' | 'en'>('sv');

  useEffect(() => {
    if (isGameOver || !timer) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameOver, timer]);

  const startGame = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedDeck = urlParams.get('deck');

    let shuffledDeck: Question[];
    let indices: number[];

    const questionsToUse = language === 'sv' ? questionsData : questionsDataEN;

    if (encodedDeck) {
      indices = decodeIndices(encodedDeck);
      shuffledDeck = indices.map((i) => questionsToUse[i]);
    } else {
      indices = shuffleArray(questionsToUse.map((_, index) => index));
      shuffledDeck = indices.map((i) => questionsToUse[i]);
      const newEncodedDeck = encodeIndices(indices);
      window.history.replaceState(null, '', `?deck=${newEncodedDeck}`);
    }

    setQuestions(shuffledDeck);
    setQuestionIndex(0);
    setTimer(3);
    setScore(0);
    setGameOver(false);
  };

  const playAgain = () => {
    setName(null);
    setGameOver(false);
    window.history.replaceState(null, '', '/');
  };

  const nextQuestion = () => {
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  return (
    <div>
      {!name ? (
        <StartScreen
          onStart={(playerName) => {
            setName(playerName);
            startGame();
          }}
          onLanguageChange={(lang) => {
            setLanguage(lang);
            startGame();
          }}
        />
      ) : isGameOver ? (
        <EndScreen
          score={score}
          onNewGame={playAgain}
        />
      ) : (
        <GameScreen
          name={name}
          question={questions[questionIndex]}
          timer={timer}
          onAnswer={(isCorrect) => {
            if (isCorrect) setScore((prev) => prev + 1);
            nextQuestion();
          }}
        />
      )}
    </div>
  );
};

export default App;
