import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProgressBar from '@/components/ProgressBar';
import AnswerOption from '@/components/AnswerOption';
import PageTransition from '@/components/PageTransition';
import { useMBTI } from '@/context/MBTIContext';
import { ThemeToggle } from '@/components/theme-toggle';

export default function QuestionPage() {
  const navigate = useNavigate();
  const { currentQuestionIndex, questions, answerQuestion } = useMBTI();
  
  useEffect(() => {
    // Redirect if test isn't started or is completed
    if (currentQuestionIndex === -1) {
      navigate('/');
    } else if (currentQuestionIndex === -2) {
      navigate('/result');
    }
  }, [currentQuestionIndex, navigate]);
  
  // Guard against invalid state
  if (currentQuestionIndex < 0 || currentQuestionIndex >= questions.length) {
    return null;
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <header className="w-full p-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </header>
        
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                <span className="text-sm font-medium text-primary">
                  {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                </span>
              </div>
              <ProgressBar />
            </div>
            
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-8 border-none shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6">{currentQuestion.text}</h2>
                </CardContent>
              </Card>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <AnswerOption
                    key={index}
                    text={option}
                    index={index}
                    onClick={() => answerQuestion(index)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}