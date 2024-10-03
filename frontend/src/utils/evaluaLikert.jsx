export const evaluate = (lista) => {
  // la lista debe contener objetos
  // [{question:'', likert: 2||3||5, answer: 0||1||2||3||4||5}, {...}, {...}]
  const questionValue = 100 / lista.length;
  var finalGrade = 0;
  var temp = 0;
  for (let i = 0; i < lista.length; i++) {
    let x = lista[i];
    if (x.likert === 2) {
      // yes = 1, no = 0
      temp = questionValue * x.answer;
    } else {
      // >2
      temp = questionValue * ((1 / x.likert) * x.answer);
    }
    finalGrade += temp;
  }
  return finalGrade;
};

// const test = [{likert: 2, answer: 1}, {likert: 3, answer: 2}]
// evaluate(test)