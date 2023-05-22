
const addQueBtn = document.getElementById('add-questions');
var formDiv = document.getElementById('addForm');
const viewQueBtn = document.getElementById('view-questions');
var tableDiv = document.getElementById('question-table');


var table = document.createElement("TABLE");


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
  // var flexDiv = document.getElementById('col');
  // flexDiv.classList.add('col-hor');



  for (var i = 0; i < table.rows.length;) {
    table.deleteRow(i);
  }




  let questions = [];

  try {
    console.log("testing");
    const response = await fetch('http://localhost:2050/api/test/getquestions');
    console.log("my Response :" + response);
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
    console.log("Deleting Question  : " + questionID);
    
  } catch (error) {
    
  }
}


function addQuestion() {

  toggleView('add');
}

function toggleView(str) {
  if (str == 'add') {
    addQueBtn.style.display = 'none';
    formDiv.style.display = 'block';


    viewQueBtn.style.display = 'block';
    tableDiv.style.display = 'none';

  }
  else {
    viewQueBtn.style.display = 'none';
    tableDiv.style.display = 'block';

    addQueBtn.style.display = 'block';
    formDiv.style.display = 'none';


  }
}




$(document).ready(function () {
  viewQuestion();
});