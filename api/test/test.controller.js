var mysql = require('mysql2');

const { Sequelize } = require('sequelize');
const { DB_TABLES: { QUESTION, TEST , HISTORY} } = require('../../db/sql.connect')
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
    const { mail } = req.params;
    console.log('mail :'+mail);
    try {

      const answerSheet = req.body;

      let overallAnswerAccuracyScore = 0;
      let totalScore = 0;
      let totalQuestions = answerSheet.length;

      for (let singleQuestion of answerSheet) {

        const { id, answer } = singleQuestion;

        const questionDetails = await QUESTION.findOne({ where: { id }, raw: true, attributes: ['id', 'question_text', 'answer'] });
        if (!questionDetails) return res.fail({ statusCode: 200, message: 'Invalid question id!' });


        var input = {
          inputs: {
            source_sentence: questionDetails.answer,
            sentences: [
              answer
            ]
          }
        };

        var ans = await TestController.query(input)*100;


        // .then((response)=>{
        console.log("Anserr  : ", JSON.stringify(ans));
        // })

        const answerAccuracyScore = answer.trim().length == 0 || questionDetails.answer.trim().length == 0 ? 0 : JSON.stringify(ans);
        //const answerAccuracyScore = answer.trim().length == 0 || questionDetails.answer.trim().length == 0 ? 0: TestController.computeMatchingPercentage(answer, questionDetails.answer);



        //................................................................

        singleQuestion.answer_accuracy_score = answerAccuracyScore;
        singleQuestion.question_text = questionDetails.question_text;

        totalScore += parseFloat(answerAccuracyScore);
        //console.log("total score",totalScore);
      }

      overallAnswerAccuracyScore = totalScore / totalQuestions;

      const data = {
        overall_answer_accuracy_score: overallAnswerAccuracyScore,
        answer_sheet: answerSheet
      }

      const { id: testId } = await TEST.create({ answer_sheet: JSON.stringify(data) , mail : mail});

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

  static async query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/DunnBC22/sentence-t5-base-FT-Quora_Sentence_Similarity-LG",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////// DELETE API//////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async deleteQuestion(req, res) {
    const { id } = req.params;

    if (!id) {
      res.fail({ message: 'Failed to fetch result!', error: err.message });
    }

    try {
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "evaluation_system_database"
      });
      var sql = "DELETE FROM question WHERE id=" + id;
      con.connect(function (err) {
        if (err) {
          console.log(err);
          throw err;
        }


        con.query(sql, function (err, result) {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log("Number of records deleted: " + result.affectedRows);
          res.ok({
            status: true,
            statusCode: 200,
            message: "Deleted Successfully",
            data: result.affectedRows
          });

        });
      });


    } catch (error) {
      res.fail({
        message: 'Failed to find questions.',
        error: error.message
      });
    }
  }



// ////////////////////////////////////////////////////////////////////////////
// //////////////////////////////// TEST HISTORY API //////////////////////////
// ////////////////////////////////////////////////////////////////////////////
  async getTestHistory(req, res) {
    try {
      const allRecords = await TEST.findAll({
        attributes: ['id','mail', 'answer_sheet', 'is_deleted', 'created_ts', 'updated_ts'],
        // attributes: ['test_id', 'email', 'name', 'score', 'q1', 'q2', 'q3', 'q4', 'q5', 'a1', 'a2', 'a3', 'a4', 'a5', 'm1', 'm2', 'm3', 'm4', 'm5'],
        raw: true,
      });

      // if (!allRecords.length) {
      //   return res.fail({ statusCode: 200, message: 'Empty Database Found !' });
      // };

      res.ok({
        message: "Questions fetched successfully.",
        data: !allRecords.length ? {} : allRecords
      });
    } catch (error) {
      res.fail({
        message: 'Failed to find questions',
        error: error.message
      });
    }
  }
}

module.exports = new TestController()
