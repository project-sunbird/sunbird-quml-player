import { Question } from "../interfaces/PlayerConfig";

export declare abstract class QuestionIterator {
  collection: any;

  abstract getQuestions(
    identifiers: string[],
    parentId?: string
  ): Promise<Question>;

  abstract getNextQuestion(
    question: Question,
    parentId?: string
  ): Promise<Question>;
}
