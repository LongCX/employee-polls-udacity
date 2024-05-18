import { _saveQuestion, _saveQuestionAnswer, _saveQuestionAnswerForNewRegistUser } from './_DATA';

describe('_saveQuestion', () => {
  it('should return the saved question with all expected fields when correctly formatted data is passed', async () => {
    const question = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: 'user'
    };

    const savedQuestion = await _saveQuestion(question);

    expect(savedQuestion).toHaveProperty('id');
    expect(savedQuestion).toHaveProperty('timestamp');
    expect(savedQuestion).toHaveProperty('author', question.author);
    expect(savedQuestion.optionOne).toHaveProperty('text', question.optionOneText);
    expect(savedQuestion.optionOne).toHaveProperty('votes', []);
    expect(savedQuestion.optionTwo).toHaveProperty('text', question.optionTwoText);
    expect(savedQuestion.optionTwo).toHaveProperty('votes', []);
  });

  it('should return an error if incorrect data is passed', async () => {
    const question = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two'
      // Missing author
    };

    await expect(_saveQuestion(question)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
  });
});

describe('_saveQuestionAnswer', () => {
  it('should return true and save the question answer with all expected fields when correctly formatted data is passed', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };

    const result = await _saveQuestionAnswer(answerData);

    expect(result).toBe(true);
  });

  it('should return an error if incorrect data is passed', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      answer: 'optionOne'
      // Missing qid
    };

    await expect(_saveQuestionAnswer(answerData)).rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});

describe('_saveQuestionAnswerForNewRegistUser', () => {
  it('should return an error if incorrect data is passed', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      answer: 'optionOne'
      // Missing qid
    };

    await expect(_saveQuestionAnswerForNewRegistUser(answerData)).rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});