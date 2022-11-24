const curr=localStorage.getItem('cur');
const score=localStorage.getItem('score')
const quizList=JSON.parse(localStorage.getItem('quizList'))
const quiz=quizList[curr]
const choiceList=JSON.parse(quiz.choice)

/** set progress bar */
const progressText=document.getElementById('progressText');
progressText.innerText=`Question ${Number(curr)+1}/4`
const progressBar=document.getElementById('progress');
progressClass='progress'+curr
progressBar.className=progressClass

/** set score */
const scoreP=document.getElementById('score')
scoreP.innerText=score

/** set question */
const question=document.getElementById('quiz');
question.innerText=quiz.question

/** set A~D List*/
const choiceListP=document.querySelectorAll('.text')
for (let i = 0; i < 4; i++) {
    choiceListP[i].innerText = choiceList[i];
}

/** solve problem */
function handleMarking(event){
    const answer=quiz.answer
    const parent=event.target.parentElement

    localStorage.setItem('cur',Number(curr)+1)
    
    //if correct
    if (parent.childNodes[3].innerText==answer){
        localStorage.setItem('score',Number(score)+1)
        parent.className="correct"
    }else{//if wrong
        parent.className="wrong"
    }

    //delay
    setTimeout(function(){
        parent.className="option"
        if (curr!=3){
            window.location.href = "./quiz.html";
            return;
        }
        window.location.href = "./result.html";
        return;
    },1000)
}


const optionList=document.querySelectorAll('.option')
optionList.forEach(option => {
    option.addEventListener('click',handleMarking)
});