export const evaluate = (lista) => {
  const questionValue = 100 / lista.length;
  var finalGrade = 0;
  var temp = 0;
  for (let i = 0; i < lista.length; i++) {
    let x = lista[i];
    let escalaLikert = x.answer_options.length;
    if (escalaLikert == 2) {
      // yes = 1, no = 0
      temp = questionValue * x.answer;
    } else {
      // >2
      temp = questionValue * ((1 / escalaLikert) * x.answer);
    }
    finalGrade += temp;
  }
  return finalGrade;
};
