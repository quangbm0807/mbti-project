import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, User, Share2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useMBTI } from '@/context/MBTIContext';
import PageTransition from '@/components/PageTransition';
import { useTranslation } from 'react-i18next';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { startTest } = useMBTI();
  const { t } = useTranslation();
  
  const handleStartTest = () => {
    startTest();
    navigate('/question');
  };
  
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: t('welcome.features.discover.title'),
      description: t('welcome.features.discover.description')
    },
    {
      icon: <User className="h-6 w-6" />,
      title: t('welcome.features.awareness.title'),
      description: t('welcome.features.awareness.description')
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: t('welcome.features.share.title'),
      description: t('welcome.features.share.description')
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: t('welcome.features.retake.title'),
      description: t('welcome.features.retake.description')
    }
  ];
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <header className="w-full p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-xl font-bold">MBTI Explorer</h1>
          </div>
          <div className="flex gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </header>
        
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                {t('welcome.title')}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('welcome.subtitle')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-16"
            >
              <Button 
                size="lg" 
                className="text-xl px-8 py-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={handleStartTest}
              >
                {t('welcome.startButton')}
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
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