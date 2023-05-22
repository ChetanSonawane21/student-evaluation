const { Sequelize } = require('sequelize');
const { DB_TABLES: { QUESTION, TEST } } = require('../../db/sql.connect')
const { commonWords } = require('../../common/utils/commonWords')
const {
  findUncommonKeywords,
validateAnswerWithActualAnswer,
removeDuplicateElementsFromArray
} = require('../../common/common.functions');

class TestController {

  /**
   * Begin Test
   * @param {*} req: Requset
   * @param {*} res: Response
   * @returns 
   */

  async beginTest(req, res) {
    try {

      const randomQuiz = await QUESTION.findAll({
        order: Sequelize.literal('rand()'),
        attributes: ['id', 'question_text'],
        raw: true,
        limit: 5
      });

      if (!randomQuiz.length) {
        return res.fail({ statusCode: 200, message: 'Failed to find questions!' });
      };

      let questionNumber = 0;

      for (let singleQuestion of randomQuiz) {
        questionNumber = questionNumber += 1;
        singleQuestion.question_number = questionNumber;
      }

      res.ok({
        message: "Questions fetched successfully.",
        data: randomQuiz
      });

    } catch (err) {

      res.fail({
        message: 'Failed to find questions.',
        error: err.message
      });

    }
  }

  /**
   * Evaluate test and calculate final score
   * @param {*} req: Request
   * @param {*} res: Response
   */
  async evaluateTest(req, res) {
    try {

      const answerSheet = req.body;

      let overallAnswerAccuracyScore = 0;
      let totalScore = 0;
      let totalQuestions = answerSheet.length;

      for (let singleQuestion of answerSheet) {

        const { id, answer } = singleQuestion;

        const questionDetails = await QUESTION.findOne({ where: { id }, raw: true, attributes: ['id', 'question_text', 'answer'] });
        if (!questionDetails) return res.fail({ statusCode: 200, message: 'Invalid question id!' });

        const summaryOfTeachersAnswer = findUncommonKeywords(questionDetails.answer);
        const summaryOfStudentAnswer = findUncommonKeywords(answer);
        const answerAccuracyScore = validateAnswerWithActualAnswer(summaryOfTeachersAnswer, summaryOfStudentAnswer)

        singleQuestion.answer_accuracy_score = answerAccuracyScore;
        singleQuestion.question_text = questionDetails.question_text;

        totalScore += answerAccuracyScore;
      }

      overallAnswerAccuracyScore = totalScore / totalQuestions;

      const data = {
        overall_answer_accuracy_score: overallAnswerAccuracyScore,
        answer_sheet: answerSheet
      }

      const { id: testId } = await TEST.create({ answer_sheet: JSON.stringify(data) });
      
      data.test_id = testId;

      res.ok({
        message: "Answersheet evaluated successfully.",
        data,
      });

    } catch (err) {
      console.log(err)
      res.fail({
        message: 'Failed to evaluate answersheet!',
        error: err.message
      });

    }
  }

  async getPreviousResult(req, res) {
    try {

      const { id } = req.params;

      if (!id) {
        res.fail({ message: 'Failed to fetch result!', error: err.message });
      }

      const testResult = await TEST.findOne({ where: { id }, raw: true, attributes: ['id', 'answer_sheet'] });
      if (!testResult) return res.fail({ statusCode: 400, message: 'Result not found!' });

      let finalResult = JSON.parse(testResult.answer_sheet);

      res.ok({
        message: "Result fetched successfully!",
        data: finalResult
      });

    } catch (err) {

      res.fail({
        message: 'Failed to fetch result!',
        error: err.message
      });

    }
  }



  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async getAllQuestions(req, res) {
    try {
      const allQuestions = await QUESTION.findAll({

        attributes: ['id', 'question_text', 'answer'],
        raw: true,
      });

      if (!allQuestions.length) {
        return res.fail({ statusCode: 200, message: 'Failed to find questions !' });
      };

      let questionNumber = 0;

      for (let question of allQuestions) {
        questionNumber = questionNumber += 1;
        question.question_number = questionNumber;
      }

      res.ok({
        message: "Questions fetched successfully.",
        data: allQuestions
      });

    } catch (err) {

      res.fail({
        message: 'Failed to find questions.',
        error: err.message
      });
    }
  }



}

module.exports = new TestController()
