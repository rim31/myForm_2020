export interface HelloWorldMessage {
  message: string;
}
export interface IAllQuestions {
  // question_id: number;
  info: string;
  description: Array<object>;
}
export interface IAllAnswers {
  info: string;
  description: Array<object>;
}

type QuestionChoice = {
  label: string;
  value: 1 | 2 | 3 | 4 | 5;
};

export type Question = {
  label: string;
  choices: QuestionChoice[];
};

export interface IQuestion {
  question_id: number;
  info: string;
  description: Array<object>;
}
