import { Answer } from './types';
import { questions } from '../data/questions';

export function calculateMBTI(answers: Answer[]): string {
  // Initialize dimension counters
  const dimensions = {
    E: 0, I: 0,  // Extroversion vs. Introversion
    S: 0, N: 0,  // Sensing vs. Intuition
    T: 0, F: 0,  // Thinking vs. Feeling
    J: 0, P: 0   // Judging vs. Perceiving
  };
  
  // Process all answers
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    
    if (!question) return;
    
    // Determine which dimension the question is measuring
    const dimension = question.dimension;
    
    // The first option (index 0) is always the first letter of the dimension
    // The second option (index 1) is always the second letter of the dimension
    if (answer.value === 0) {
      // First option was chosen
      dimensions[dimension[0] as keyof typeof dimensions] += 1;
    } else {
      // Second option was chosen
      dimensions[dimension[1] as keyof typeof dimensions] += 1;
    }
  });
  
  // Determine the four-letter MBTI type
  let type = '';
  
  // Extroversion vs. Introversion
  type += dimensions.E > dimensions.I ? 'E' : 'I';
  
  // Sensing vs. Intuition
  type += dimensions.S > dimensions.N ? 'S' : 'N';
  
  // Thinking vs. Feeling
  type += dimensions.T > dimensions.F ? 'T' : 'F';
  
  // Judging vs. Perceiving
  type += dimensions.J > dimensions.P ? 'J' : 'P';
  
  return type;
}