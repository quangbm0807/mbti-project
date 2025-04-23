import { createContext, useContext, useState, ReactNode } from 'react';
import { calculateMBTI } from '@/lib/calculateMBTI';
import { Question, Answer, MBTIType } from '@/lib/types';
import { questions } from '@/data/questions';
import { mbtiTypes } from '@/data/mbtiTypes';

interface MBTIContextType {
  currentQuestionIndex: number;
  answers: Answer[];
  result: MBTIType | null;
  questions: Question[];
  startTest: () => void;
  resetTest: () => void;
  answerQuestion: (answer: number) => void;
  calculateResult: () => void;
  progressPercentage: number;
}

const MBTIContext = createContext<MBTIContextType | undefined>(undefined);

export const MBTIProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 means test not started
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<MBTIType | null>(null);

  const startTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  const resetTest = () => {
    setCurrentQuestionIndex(-1);
    setAnswers([]);
    setResult(null);
  };

  const answerQuestion = (answerValue: number) => {
    setAnswers([...answers, { questionId: currentQuestionIndex, value: answerValue }]);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const mbtiResult = calculateMBTI(answers);
    const resultType = mbtiTypes.find(type => type.code === mbtiResult);
    
    if (resultType) {
      setResult(resultType);
      setCurrentQuestionIndex(-2); // -2 means test completed
    }
  };

  const progressPercentage = 
    currentQuestionIndex === -1 
      ? 0 
      : currentQuestionIndex === -2 
        ? 100 
        : Math.round(((currentQuestionIndex) / questions.length) * 100);

  return (
    <MBTIContext.Provider
      value={{
        currentQuestionIndex,
        answers,
        result,
        questions,
        startTest,
        resetTest,
        answerQuestion,
        calculateResult,
        progressPercentage,
      }}
    >
      {children}
    </MBTIContext.Provider>
  );
};

export const useMBTI = () => {
  const context = useContext(MBTIContext);
  
  if (context === undefined) {
    throw new Error('useMBTI must be used within a MBTIProvider');
  }
  
  return context;
};