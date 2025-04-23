import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnswerOptionProps {
  text: string;
  index: number;
  onClick: () => void;
}

export default function AnswerOption({ text, index, onClick }: AnswerOptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Button
        variant="outline"
        className={cn(
          "w-full py-6 px-6 mb-4 text-left justify-start h-auto text-lg",
          "hover:bg-primary/5 dark:hover:bg-primary/20 hover:border-primary/30",
          "transition-all duration-200 ease-in-out"
        )}
        onClick={onClick}
      >
        {text}
      </Button>
    </motion.div>
  );
}