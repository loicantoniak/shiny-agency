import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import colors from "../utils/style/colors";
import { Loader } from "../utils/style/Atoms";

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`;

const QuestionContent = styled.span`
  margin: 30px;
`;

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`;

export default function Survey() {
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { questionId } = useParams();
  const questionIdInt = parseInt(questionId);

  const prevQuestionnaireId = questionIdInt <= 1 ? 1 : questionIdInt - 1;
  const nextQuestionnaireId = questionIdInt + 1;

  useEffect(() => {
    fetchSurvey();
  }, []);

  async function fetchSurvey() {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8001/survey");
      const { surveyData } = await response.json();
      setQuestions(surveyData);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  if(error) {
    return <span>Oups, il y a un problème</span>
  }

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionId}</QuestionTitle>

      {isLoading ? (
        <Loader />
      ) : (
        <QuestionContent>{questions[questionId]}</QuestionContent>
      )}

      <LinkWrapper>
        <Link to={`/questionnaire/${prevQuestionnaireId}`}>Précédent</Link>
        {questions[questionIdInt + 1] ? (
          <Link to={`/questionnaire/${nextQuestionnaireId}`}>Suivant</Link>
        ) : (
          <Link to={"/resultats"}>Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  );
}
