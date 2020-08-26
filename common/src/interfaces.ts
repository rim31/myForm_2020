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

export type QuestionChoice = {
  label: string;
  value: 1 | 2 | 3 | 4 | 5;
};

export type MyQuestionChoice = {
  label: string;
  value: 1 | 2 | 3 | 4 | 5;
  id: number,
  answer: 1 | 2 | 3 | 4 | 5,
  question: string,
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

export interface IResp {
  label: string;
  value: 1 | 2 | 3 | 4 | 5;
}

export interface IAnswer {
  answer_id: string;
  info: string;
  description: QuestionChoice[];
}


export interface IBody {
  info: string;
  description: any;
}
