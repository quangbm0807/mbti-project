export interface Question {
  id: number;
  text: string;
  options: string[];
  dimension: string;
}

export interface Answer {
  questionId: number;
  value: number;
}

export interface MBTIType {
  code: string;
  title: string;
  description: string;
  strengths: string[];
  color: string;
  image: string;
}