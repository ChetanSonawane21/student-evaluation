
const addQueBtn = document.getElementById('add-questions');
var formDiv = document.getElementById('addForm');

const viewQueBtn = document.getElementById('view-questions');
var tableDiv = document.getElementById('question-table');

const testHistoryBtn = document.getElementById('test-history');
var historyTableDiv = document.getElementById('history-table');


var table = document.createElement("TABLE");
var historyTable = document.createElement("TABLE");

var checkboxDiv = document.getElementById("checkboxDiv");
var checkBoxLatest = document.getElementById("check-latest");
var latestFirst = false;


function addQuestion() {
  // Get form inputs
  const questionText = document.getElementById('questionText').value;
  const answerText = document.getElementById('answerText').value;

  // Create request payload from user input
  const payload = {
    "question_text": questionText,
    "answer": answerText
  };

  // Send POST request to server
  fetch('http://localhost:2050/api/question/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        document.getElementById('success-message').style.display = 'block';
        // Redirect to teacher dashboard page after 3 seconds
        setTimeout(function () {
          window.location.href = 'teacher_dashboard.html';
        }, 3000);
      } else {
        alert('Failed to add question. Please try again.');
      }
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred. Please try again.');
    });
}





// ///////////////////////////////////////////////////////////////////////////API CALL

async function viewQuestion() {

  for (var i = 0; i < table.rows.length;) {
    table.deleteRow(i);
  }

  let questions = [];

  try {
    const response = await fetch('http://localhost:2050/api/test/getquestions');
    const data = await response.json();


    if (data.status === true && data.statusCode === 200) {
      let q = data.data;


      for (let idx in q) {
        var row = table.insertRow(idx);
        row.insertCell(0).innerHTML = q[idx].id;
        row.insertCell(1).innerHTML = q[idx].question_text;
        row.insertCell(2).innerHTML = q[idx].answer;
        row.insertCell(3).innerHTML = "<td><input type='button' value='Delete' onclick='deleteQuestion(" + q[idx].id + ")'></td>";
      }


      var header = table.createTHead().insertRow(0);
      header.insertCell(0).innerHTML = "<b>id</b>";
      header.insertCell(1).innerHTML = "<b>Question</b>";
      header.insertCell(2).innerHTML = "<b>Answer</b>";
      header.insertCell(3).innerHTML = "<b>Edit</b>";
    } else {
      alert('Error fetching questions. Please try again later !.\ndataStatus : ' + data.status + "\nstatus code : " + data.statusCode + "\n" + data.message);
    }

  } catch (error) {
    alert('Error fetching questions. Please try again later. \n' + error);
  }

  tableDiv.appendChild(table);

  toggleView('view');


}

function getDeteleButton(id) {
  var b = document.createElement("BUTTON");
  var t = document.createTextNode("Delete");

  b.appendChild(t);

  return b;

}


// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////  DELETE ROW ///////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function deleteQuestion(questionID) {

  try {

    const response = await fetch('http://localhost:2050/api/test/deletequestion/' + questionID);
    const data = await response.json();
    console.log(data);
    if (data.status === true && data.statusCode === 200) {

      console.log("Deleted Question  : " + questionID);
      alert("Deleted Question  : " + questionID);
    }
    else {
      // alert('Error Deleting question after fetching. Please try again later !.\ndataStatus : ' + data.status + "\nstatus code : " + data.statusCode + "\n" + data.message);
    }


    viewQuestion();

  } catch (error) {
    alert('Error fetching questions. Please try again later. \n' + error);
  }
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////  TEST RECORDS ///////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function displayTestHistory() {
  for (var i = 0; i < historyTable.rows.length;) {
    historyTable.deleteRow(i);
  }

  
  try {
    const response = await fetch('http://localhost:2050/api/test/gethistory');
    const data = await response.json();


    if (data.status === true && data.statusCode === 200) {
      let q = data.data;


      
      console.log(q);
      if (latestFirst)
      {
        q.reverse();
        
        }
      for (let idx in q) {
        var testData = JSON.parse(q[idx].answer_sheet);

        var ts = new Date(q[idx].created_ts);
        var date = ts.getDate() + "/" + ts.getMonth() + "/" + ts.getFullYear() +" "+ts.getHours()+":"+ts.getMinutes();
        

        var row = historyTable.insertRow(idx);
        row.insertCell(0).innerHTML = q[idx].id;
        row.insertCell(1).innerHTML = q[idx].mail;
        row.insertCell(2).innerHTML = date;
        row.insertCell(3).innerHTML = testData.overall_answer_accuracy_score;
        for (let q in testData.answer_sheet)
        {
          row.insertCell(parseInt(q*2) + parseInt(4)).innerHTML = testData.answer_sheet[q].question_text;
          row.insertCell(parseInt(q*2) + parseInt(5)).innerHTML = testData.answer_sheet[q].answer;
          }
        // row.insertCell(3).innerHTML = "<td><input type='button' value='Delete' onclick='deleteQuestion(" + q[idx].id + ")'></td>";
      }

      var header = historyTable.createTHead().insertRow(0);
      header.insertCell(0).innerHTML = "<b>Test Id</b>";
      header.insertCell(1).innerHTML = "<b>Email</b>";
      header.insertCell(2).innerHTML = "<b>Completed At</b>";
      header.insertCell(3).innerHTML = "<b>Score</b>";
      header.insertCell(4).innerHTML = "<b>Question 1</b>";
      header.insertCell(5).innerHTML = "<b>Answer 1</b>";
      header.insertCell(6).innerHTML = "<b>Question 2</b>";
      header.insertCell(7).innerHTML = "<b>Answer 2</b>";
      header.insertCell(8).innerHTML = "<b>Question 3</b>";
      header.insertCell(9).innerHTML = "<b>Answer 3</b>";
      header.insertCell(10).innerHTML = "<b>Question 4</b>";
      header.insertCell(11).innerHTML = "<b>Answer 4</b>";
      header.insertCell(12).innerHTML = "<b>Question 5</b>";
      header.insertCell(13).innerHTML = "<b>Answer 5</b>";

    }
    else
    {
      console.log("200 ERROR ");
      console.log(data);
      }
  } catch (error) {
    console.log(error);

    
  }
  historyTableDiv.appendChild(historyTable);
  toggleView('history')

}

function addQuestionView() {

  toggleView('add');
}

function toggleView(str) {
  if (str == 'add') {
    addQueBtn.style.display = 'none';
    formDiv.style.display = 'block';
    testHistoryBtn.style.display = 'block';


    checkboxDiv.style.display = 'none';
    viewQueBtn.style.display = 'block';
    tableDiv.style.display = 'none';
    historyTableDiv.style.display = 'none';


  }
  else if (str == 'view') {
    checkboxDiv.style.display = 'none';
    viewQueBtn.style.display = 'none';
    tableDiv.style.display = 'block';
    testHistoryBtn.style.display = 'block';

    addQueBtn.style.display = 'block';
    formDiv.style.display = 'none';
    historyTableDiv.style.display = 'none';
  }
  else {
    checkboxDiv.style.display = 'block';
    addQueBtn.style.display = 'block';
    viewQueBtn.style.display = 'block';
    testHistoryBtn.style.display = 'none';

    historyTableDiv.style.display = 'block';
    tableDiv.style.display = 'none';
    formDiv.style.display = 'none';
  }

}

checkBoxLatest.addEventListener('change', function () {
  latestFirst = this.checked;
  displayTestHistory()
})




$(document).ready(function () {
  // checkboxDiv.style.display = 'none';
  viewQuestion();
});