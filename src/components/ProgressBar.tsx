import { motion } from 'framer-motion';
import { useMBTI } from '@/context/MBTIContext';

export default function ProgressBar() {
  const { progressPercentage } = useMBTI();
  
  return (
    <div className="w-full bg-secondary rounded-full h-2 mb-4">
      <motion.div
        className="h-full bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
}