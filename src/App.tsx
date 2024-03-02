import React, { useState, useEffect } from 'react';
import './App.css';

type Option = {
  name: string;
  value: number;
  text: string;
  isUnderlined?: true;
  polygon?: '▲' | '■';
};

type QuestionNumber = 1 | 2 | 3;

type Question = {
  id: QuestionNumber;
  text: string;
  options: Option[];
};

const questions: Question[] = [
  {
    id: 1,
    text: '質問１',
    options: [
      {
        name: 'id1',
        value: 84,
        text: '①（質問2でAのみ選択可能）',
      },
      {
        name: 'id1',
        value: 86,
        text: '②（質問2でB〜F選択可能）',
      },
    ],
  },
  {
    id: 2,
    text: '質問２',
    options: [
      { name: 'id2', value: 88, text: 'A' },
      { name: 'id2', value: 89, text: 'B' },
      { name: 'id2', value: 90, text: 'C' },
      { name: 'id2', value: 91, text: 'D' },
      { name: 'id2', value: 92, text: 'E' },
      { name: 'id2', value: 93, text: 'F(質問3で下線のみ選択可能)' },
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
  const [question1Answer, setQuestion1Answer] = useState<string>('');
  const [question2Answer, setQuestion2Answer] = useState<string>('');
  const [question3Answer, setQuestion3Answer] = useState<string>('');
  const [showQuestion, setShowQuestion] = useState<QuestionNumber>(1);

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setAnswerFunction: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setAnswerFunction(e.target.value);

    if (showQuestion >= 1 && showQuestion < 3) {
      setShowQuestion(
        (currentQuestion) => (currentQuestion + 1) as QuestionNumber
      );
    }

    if (showQuestion === 3) {
      console.log('質問３まで回答しました');
    }
  };

  const handleBackButton = () => {
    if (showQuestion > 1 && showQuestion <= 3) {
      setShowQuestion(
        (currentQuestion) => (currentQuestion - 1) as QuestionNumber
      );
    }

    if (showQuestion === 1) {
      console.log('質問１まで戻りました');
    }
  };

  useEffect(() => {
    console.log('質問番号が変更されました');
  }, [showQuestion]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>アンケート</h1>
        {questions.map((question) => {
          if (question.id === showQuestion) {
            return (
              <div key={question.id}>
                <h2>{question.text}</h2>
                <form>
                  {question.options.map((option) => {
                    return (
                      <div key={option.value}>
                        <input
                          type="radio"
                          id={option.value.toString()}
                          name={option.name}
                          value={option.value.toString()}
                          onChange={(e) => {
                            if (question.id === 1) {
                              handleQuestionChange(e, setQuestion1Answer);
                            }
                            if (question.id === 2) {
                              handleQuestionChange(e, setQuestion2Answer);
                            }
                            if (question.id === 3) {
                              handleQuestionChange(e, setQuestion3Answer);
                            }
                          }}
                        />
                        <label htmlFor={option.value.toString()}>
                          {option.text}
                        </label>
                      </div>
                    );
                  })}
                </form>
                <button onClick={handleBackButton}>戻る</button>
              </div>
            );
          }
          return null;
        })}
      </header>
    </div>
  );
};

export default App;
