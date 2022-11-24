/** set quiz array */
let quiz=[
    {
        question:"Which one is NOT a legal variable name?",
        choice:JSON.stringify(["_myvar","Myvar","my_var","my-var"]),
        answer:"my-var"
    },
    {
        question:"What is a correct syntax to output \"Hello World\" in Python?",
        choice:JSON.stringify(["print(\"Hello World\")","p(\"Hello World\")","echo(\"Hello World\");","echo \"Hello World\""]),
        answer:"print(\"Hello World\")"
    },
    {
        question:"What is the correct syntax to output the type of a variable or object in Python?",
        choice:JSON.stringify(["/*This is a comment*/","#This is a comment","//This is a comment","None of the above"]),
        answer:"#This is a comment"
    },
    {
        question:"What is the correct syntax to output the type of a variable or object in Python?",
        choice:JSON.stringify(["print(typeof(x))", "print(type of x)", "print(typeOf(x))", "print(type(x))",]),
        answer:"print(type(x))"
    },
    {
        question:"What is the correct file extension for Python files?",
        choice:JSON.stringify([".pt",".pyt",".pyth",".py"]),
        answer:".py"    
    }
]
quiz.forEach(q => {
    JSON.stringify(q)
});
quiz=JSON.stringify(quiz.sort(() => Math.random() - 0.5).slice(0,-1)) //random array 

//initialize
localStorage.setItem('quizList',quiz)
localStorage.setItem('cur', 0)
localStorage.setItem('score', 0)