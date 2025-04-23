import { Answer } from './types';
import { questions } from '../data/questions';

export function calculateMBTI(answers: Answer[]): string {
  // Khởi tạo bộ đếm cho các chiều
  const dimensions = {
    E: 0, I: 0,  // Extroversion vs. Introversion
    S: 0, N: 0,  // Sensing vs. Intuition
    T: 0, F: 0,  // Thinking vs. Feeling
    J: 0, P: 0   // Judging vs. Perceiving
  };
  
  // Tạo bản đồ tra cứu nhanh cho các câu hỏi
  const questionMap = questions.reduce((map, question) => {
    map[question.id] = question;
    return map;
  }, {} as Record<number, typeof questions[0]>);
  
  // Xử lý tất cả câu trả lời
  answers.forEach(answer => {
    const question = questionMap[answer.questionId];
    
    if (!question) return;
    
    // Xác định chiều mà câu hỏi đang đo lường
    const dimension = question.dimension;
    
    // Tùy chọn đầu tiên (index 0) luôn là chữ cái đầu tiên của chiều
    // Tùy chọn thứ hai (index 1) luôn là chữ cái thứ hai của chiều
    if (answer.value === 0) {
      // Tùy chọn đầu tiên được chọn
      dimensions[dimension[0] as keyof typeof dimensions] += 1;
    } else {
      // Tùy chọn thứ hai được chọn
      dimensions[dimension[1] as keyof typeof dimensions] += 1;
    }
  });
  
  // Xác định loại MBTI bốn chữ cái
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