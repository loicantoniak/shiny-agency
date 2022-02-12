import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Survey() {
  const { questionnaireId } = useParams();
  const questionaireIdInt = parseInt(questionnaireId);

  const prevQuestionnaireId =
    questionaireIdInt <= 1 ? 1 : questionaireIdInt - 1;
  const nextQuestionnaireId = questionaireIdInt + 1;

  return (
    <div>
      <h1>Questionnaire {questionnaireId}</h1>

      <Link to={`/questionnaire/${prevQuestionnaireId}`}>Précédent</Link>
      {questionaireIdInt >= 10 ? (
        <Link to={"/resultats"}>Résultats</Link>
      ) : (
        <Link to={`/questionnaire/${nextQuestionnaireId}`}>Suivant</Link>
      )}
    </div>
  );
}
