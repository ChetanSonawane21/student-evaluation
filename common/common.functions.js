const { commonWords } = require('./utils/commonWords')

function findUncommonKeywords(str) {
    if (!str) return [];

    const wordCount = {};
    const words = str.match(/\b\w+\b/g);
    words.forEach((word) => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    const uncommonKeywords = []

    Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 200)
        .map(([word]) => {
            if (!(commonWords.includes(word.toLowerCase()))) {
                let storeWord = word.toLowerCase();
                uncommonKeywords.push(storeWord)
            }

        });

    const finalResult = removeDuplicateElementsFromArray(uncommonKeywords);
    return finalResult
}

function validateAnswerWithActualAnswer(summaryOfTeachersAnswer, summaryOfStudentAnswer) {
    const totalKeyWords = summaryOfTeachersAnswer.length;
    let foundKeywords = 0;

    for (let keyWord of summaryOfStudentAnswer) {
        if (summaryOfTeachersAnswer.includes(keyWord)) {
            foundKeywords += 1;
        }
    }

    const answerAccuracyScore = (foundKeywords / totalKeyWords) * 100;
    return answerAccuracyScore
}


function removeDuplicateElementsFromArray(arr) {
    const uniqueArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!uniqueArr.includes(arr[i])) {
            uniqueArr.push(arr[i]);
        }
    }
    return uniqueArr;
}


module.exports = {
    findUncommonKeywords,
    validateAnswerWithActualAnswer,
    removeDuplicateElementsFromArray,
}