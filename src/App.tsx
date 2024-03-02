import React, { useState, useEffect } from 'react';
import './App.css';

type Option = {
  name: string;
  value: number;
  text: string;
  nextSelections?: readonly number[];
  isUnderlined?: true;
  polygon?: '▲' | '■';
};

type QuestionNumber = 1 | 2 | 3;

type Question = {
  id: QuestionNumber;
  text: string;
  options: Option[];
};

const defaultNextSelectionsForQuestion2: readonly number[] = [
  2, 3, 4, 5, 6, 7, 8, 9, 112, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 114, 33, 34, 35, 36, 37, 38, 115,
  39, 40, 41, 42, 116,
];
const questions: readonly Question[] = [
  {
    id: 1,
    text: '質問１',
    options: [
      {
        name: 'id1',
        value: 84,
        text: '①（質問2でAのみ選択可能）',
        nextSelections: [88],
      },
      {
        name: 'id1',
        value: 86,
        text: '②（質問2でB〜F選択可能）',
        nextSelections: [89, 90, 91, 92, 93],
      },
    ],
  },
  {
    id: 2,
    text: '質問２',
    options: [
      {
        name: 'id2',
        value: 88,
        text: 'A',
        nextSelections: defaultNextSelectionsForQuestion2,
      },
      {
        name: 'id2',
        value: 89,
        text: 'B',
        nextSelections: defaultNextSelectionsForQuestion2,
      },
      {
        name: 'id2',
        value: 90,
        text: 'C',
        nextSelections: defaultNextSelectionsForQuestion2,
      },
      {
        name: 'id2',
        value: 91,
        text: 'D',
        nextSelections: defaultNextSelectionsForQuestion2,
      },
      {
        name: 'id2',
        value: 92,
        text: 'E',
        nextSelections: defaultNextSelectionsForQuestion2,
      },
      {
        name: 'id2',
        value: 93,
        text: 'F(質問3で下線のみ選択可能)',
        nextSelections: [
          2, 3, 4, 5, 6, 7, 112, 20, 21, 22, 23, 25, 26, 114, 36, 37, 115, 40,
        ],
      },
    ],
  },
  {
    id: 3,
    text: '質問３',
    options: [
      { name: 'id3', value: 2, text: 'ア', isUnderlined: true },
      { name: 'id3', value: 3, text: 'イ', isUnderlined: true },
      { name: 'id3', value: 4, text: 'ウ', isUnderlined: true },
      { name: 'id3', value: 5, text: 'エ', isUnderlined: true },
      { name: 'id3', value: 6, text: 'オ', isUnderlined: true, polygon: '■' },
      { name: 'id3', value: 7, text: 'カ', isUnderlined: true },
      { name: 'id3', value: 8, text: 'キ', polygon: '■' },
      { name: 'id3', value: 9, text: 'ク' },
      { name: 'id3', value: 112, text: 'ケ', isUnderlined: true },
      { name: 'id3', value: 10, text: 'コ' },
      { name: 'id3', value: 11, text: 'サ' },
      { name: 'id3', value: 12, text: 'シ' },
      { name: 'id3', value: 13, text: 'ス' },
      { name: 'id3', value: 14, text: 'セ' },
      { name: 'id3', value: 15, text: 'ソ' },
      { name: 'id3', value: 16, text: 'タ' },
      { name: 'id3', value: 17, text: 'チ' },
      { name: 'id3', value: 18, text: 'ツ' },
      { name: 'id3', value: 19, text: 'テ' },
      { name: 'id3', value: 20, text: 'ト', isUnderlined: true },
      { name: 'id3', value: 21, text: 'ナ', isUnderlined: true },
      { name: 'id3', value: 22, text: 'ニ', isUnderlined: true },
      { name: 'id3', value: 23, text: 'ヌ', isUnderlined: true },
      { name: 'id3', value: 24, text: 'ネ' },
      { name: 'id3', value: 25, text: 'ノ', isUnderlined: true },
      { name: 'id3', value: 26, text: 'ハ', isUnderlined: true },
      { name: 'id3', value: 27, text: 'ヒ', polygon: '■' },
      { name: 'id3', value: 28, text: 'フ' },
      { name: 'id3', value: 29, text: 'ヘ' },
      { name: 'id3', value: 30, text: 'ホ', polygon: '▲' },
      { name: 'id3', value: 31, text: 'マ', polygon: '■' },
      { name: 'id3', value: 32, text: 'ミ' },
      { name: 'id3', value: 114, text: 'ム', isUnderlined: true },
      { name: 'id3', value: 33, text: 'メ' },
      { name: 'id3', value: 34, text: 'モ' },
      { name: 'id3', value: 35, text: 'ヤ' },
      { name: 'id3', value: 36, text: 'ユ', isUnderlined: true },
      { name: 'id3', value: 37, text: 'ヨ', isUnderlined: true },
      { name: 'id3', value: 38, text: 'ラ' },
      { name: 'id3', value: 115, text: 'リ', isUnderlined: true },
      { name: 'id3', value: 39, text: 'ル' },
      { name: 'id3', value: 40, text: 'レ', isUnderlined: true },
      { name: 'id3', value: 41, text: 'ロ' },
      { name: 'id3', value: 42, text: 'ワ' },
      { name: 'id3', value: 116, text: 'ヲ' },
    ],
  },
];

const App: React.FC = () => {
  const [answers, setAnswers] = useState<{
    1: Option | null;
    2: Option | null;
    3: Option | null;
  }>({
    1: null,
    2: null,
    3: null,
  });
  const [availableSelections, setAvailableSelections] = useState<number[]>(
    questions[0].options.map((option) => option.value)
  );
  const [currentQuestionId, setCurrentQuestionId] = useState<QuestionNumber>(1);

  const showingQuestions = questions.filter(
    (question) => question.id === currentQuestionId
  );

  const handleQuestionChange = (answer: Option, id: number) => {
    setAnswers((currentAnswers) => {
      return {
        ...currentAnswers,
        [id]: answer,
      };
    });

    if (id >= 1 && id < 3) {
      setCurrentQuestionId(
        (currentQuestion) => (currentQuestion + 1) as QuestionNumber
      );
    }

    if (id === 3) console.log('質問３まで回答しました');
  };

  const handleBackButton = () => {
    if (currentQuestionId > 1 && currentQuestionId <= 3) {
      setCurrentQuestionId(
        (currentQuestion) => (currentQuestion - 1) as QuestionNumber
      );
    }

    if (currentQuestionId === 1) console.log('質問１まで戻りました');
  };

  const handleNextButton = () => {
    if (currentQuestionId >= 1 && currentQuestionId < 3) {
      setCurrentQuestionId(
        (currentQuestion) => (currentQuestion + 1) as QuestionNumber
      );
    }

    if (currentQuestionId === 3) console.log('質問３まで回答しました');
  };

  useEffect(() => {
    if (currentQuestionId < 1) return console.warn('質問１までしか戻れません');
    if (currentQuestionId > 3) return console.log('質問３まで回答しました');
    const previousAnswer = answers[(currentQuestionId - 1) as QuestionNumber];

    if (currentQuestionId !== 1 && previousAnswer === null) {
      return console.warn('前の質問に回答してください');
    }

    const [currentQuestions] = questions.filter(
      (question) => question.id === currentQuestionId
    );
    setAvailableSelections(
      currentQuestions.options
        .filter((option) => {
          if (previousAnswer?.nextSelections) {
            return previousAnswer.nextSelections.includes(option.value);
          }
          return true;
        })
        .map((option) => option.value)
    );
  }, [answers, currentQuestionId]);

  return (
    <div className="App">
      <h1>アンケート</h1>
      {showingQuestions.map((question) => {
        const availableOptions = question.options.filter((option) =>
          availableSelections.includes(option.value)
        );
        return (
          <div key={question.id}>
            <h2>{question.text} ◯◯◯◯を選んで下さい</h2>
            <form>
              {availableOptions.map((option) => {
                const label = option.isUnderlined ? (
                  <u>{option.text}</u>
                ) : (
                  option.text
                );
                return (
                  <div key={option.value}>
                    <input
                      type="radio"
                      id={option.value.toString()}
                      name={option.name}
                      value={option.value.toString()}
                      checked={answers[question.id]?.value === option.value}
                      onChange={() => {
                        handleQuestionChange(option, question.id);
                      }}
                    />
                    <label htmlFor={option.value.toString()}>
                      {label}
                      {option.polygon}
                    </label>
                  </div>
                );
              })}
            </form>
            <div style={{ marginTop: '20px' }}>
              {currentQuestionId > 1 && (
                <button
                  style={{ marginRight: '10px' }}
                  onClick={handleBackButton}
                >
                  戻る
                </button>
              )}
              {currentQuestionId < 3 && answers[currentQuestionId] != null && (
                <button onClick={handleNextButton}>次へ</button>
              )}
            </div>
          </div>
        );
      })}
      <hr style={{ marginTop: '40px' }} />
      <div>
        <h2 style={{ marginTop: '40px' }}>回答</h2>
        {answers[1] && (
          <span style={{ marginRight: '20px' }}>
            質問１: {answers[1]?.text}
          </span>
        )}
        {answers[2] && (
          <span style={{ marginRight: '20px' }}>
            質問２: {answers[2]?.text}
          </span>
        )}
        {answers[3] && (
          <span style={{ marginRight: '20px' }}>
            質問３: {answers[3]?.text}
          </span>
        )}
      </div>
    </div>
  );
};

export default App;
