import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Share, Home, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMBTI } from '@/context/MBTIContext';
import PageTransition from '@/components/PageTransition';
import Confetti from '@/components/Confetti';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export default function ResultPage() {
  const navigate = useNavigate();
  const { result, resetTest, startTest } = useMBTI();
  const { toast } = useToast();
  const { t } = useTranslation();
  
  useEffect(() => {
    // Redirect if no result exists
    if (!result) {
      navigate('/');
    }
  }, [result, navigate]);
  
  // Guard against invalid state
  if (!result) {
    return null;
  }
  
  const handleShare = () => {
    const shareText = t('result.shareText', { type: result.code, title: result.title });
    
    if (navigator.share) {
      navigator.share({
        title: t('result.title'),
        text: shareText,
        url: window.location.href,
      }).catch(() => {
        copyToClipboard(shareText);
      });
    } else {
      copyToClipboard(shareText);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: t('result.copied'),
          description: text,
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: t('result.copyError'),
        });
      });
  };
  
  const handleRetake = () => {
    startTest();
    navigate('/question');
  };
  
  const handleBackToHome = () => {
    resetTest();
    navigate('/');
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <Confetti />
        
        <header className="w-full p-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleBackToHome}
            className="rounded-full"
          >
            <Home className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </header>
        
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('result.title')}</h1>
              <p className="text-gray-600 dark:text-gray-300">{t('result.subtitle')}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="overflow-hidden border-none shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <div className={`h-24 w-full bg-gradient-to-r ${result.color}`} />
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <motion.div 
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
                      className="mx-auto md:mx-0 flex-shrink-0 -mt-12 w-24 h-24 rounded-xl overflow-hidden shadow-lg bg-white p-1 dark:bg-gray-700"
                    >
                      <div 
                        className="w-full h-full rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${result.image})` }}
                      />
                    </motion.div>
                    
                    <div className="text-center md:text-left mt-4 md:mt-0">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <div className="flex flex-col md:flex-row md:items-center mb-4 gap-2">
                          <h2 className="text-4xl font-bold">{result.code}</h2>
                          <span className="text-2xl text-gray-600 dark:text-gray-300">{result.title}</span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-6">{result.description}</p>
                        
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-3">{t('result.strengths')}</h3>
                          <div className="flex flex-wrap gap-2">
                            {result.strengths.map((strength, index) => (
                              <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
            >
              <Button 
                className="flex-1 gap-2"
                variant="outline"
                onClick={handleRetake}
              >
                <RefreshCw className="h-4 w-4" />
                {t('result.retakeButton')}
              </Button>
              
              <Button 
                className="flex-1 gap-2"
                onClick={handleShare}
              >
                <Share className="h-4 w-4" />
                {t('result.shareButton')}
              </Button>
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