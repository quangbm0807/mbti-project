import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useMBTI } from '@/context/MBTIContext';
import PageTransition from '@/components/PageTransition';
import ProgressBar from '@/components/ProgressBar';
import AnswerOption from '@/components/AnswerOption';
import { useTranslation } from 'react-i18next';

export default function QuestionPage() {
  const navigate = useNavigate();
  const { 
    currentQuestionIndex, 
    questions, 
    answerQuestion, 
    resetTest, 
  } = useMBTI();
  const { t } = useTranslation();
  
  // Redirect to home if test hasn't been started
  useEffect(() => {
    if (currentQuestionIndex === -1) {
      navigate('/');
    } else if (currentQuestionIndex === -2) {
      // Test is completed, navigate to results
      navigate('/result');
    }
  }, [currentQuestionIndex, navigate]);
  
  // Guard against invalid state
  if (currentQuestionIndex < 0 || currentQuestionIndex >= questions.length) {
    return null;
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // Dịch câu hỏi và câu trả lời từ i18n
  const translatedQuestionText = t(`question.questions.q${currentQuestion.id}.text`);
  const translatedOptions = currentQuestion.options.map((_, index) => 
    t(`question.questions.q${currentQuestion.id}.options.${index}`)
  );
  
  const handleOptionSelect = (optionIndex: number) => {
    answerQuestion(optionIndex);
  };
  
  const handleGoBack = () => {
    resetTest();
    navigate('/');
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <header className="w-full p-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleGoBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">{t('question.back')}</span>
          </Button>
          <div className="flex gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </header>
        
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-2xl mx-auto">
            <div className="mb-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center">
                {t('question.progress', { current: currentQuestionIndex + 1, total: questions.length })}
              </p>
              <ProgressBar />
            </div>
            
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center">
                {translatedQuestionText}
              </h2>
              
              <div className="space-y-2">
                {translatedOptions.map((option, index) => (
                  <AnswerOption
                    key={index}
                    text={option}
                    index={index}
                    onClick={() => handleOptionSelect(index)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </main>
        
        <footer className="w-full p-4 text-center text-gray-500 dark:text-gray-400">
          <p>© 2025 MBTI Explorer. All rights reserved.</p>
        </footer>
      </div>
    </PageTransition>
  );
}