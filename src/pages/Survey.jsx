import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import colors from "../utils/style/colors";
import { Loader } from "../utils/style/Atoms";
import { SurveyContext } from "../utils/context";
import { useFetch } from "../utils/hooks/useFetch";
import useTheme from "../utils/hooks/useTheme";

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export default function Survey() {
  const { questionId } = useParams();
  const questionIdInt = parseInt(questionId);
  const { answers, saveAnswers } = useContext(SurveyContext);
  const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`);
  const surveyData = data?.surveyData
  const { theme } = useTheme()

  const prevQuestionnaireId = questionIdInt <= 1 ? 1 : questionIdInt - 1;
  const nextQuestionnaireId = questionIdInt + 1;

  function saveReply(answer) {
    saveAnswers({ [questionId]: answer });
  }

  if (error) {
    return <span>Oups, il y a un problème</span>;
  }


  return (
    <SurveyContainer>
      <QuestionTitle  theme={theme}>Question {questionId}</QuestionTitle>

      {isLoading ? (
        <Loader />
      ) : (
        <QuestionContent theme={theme}>{surveyData && surveyData[questionId]}</QuestionContent>
      )}

      <ReplyWrapper>
        <ReplyBox
          onClick={() => saveReply(true)}
          isSelected={answers[questionId] === true}
          theme={theme}
        >
          Oui
        </ReplyBox>
        <ReplyBox
          onClick={() => saveReply(false)}
          isSelected={answers[questionId] === false}
          theme={theme}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>
      <LinkWrapper theme={theme}>
        <Link to={`/questionnaire/${prevQuestionnaireId}`}>Précédent</Link>
        {surveyData && surveyData[questionIdInt + 1] ? (
          <Link to={`/questionnaire/${nextQuestionnaireId}`}>Suivant</Link>
        ) : (
          <Link to={"/resultats"}>Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  );
}
