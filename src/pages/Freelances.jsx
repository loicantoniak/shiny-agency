import React from "react";
import Card from "../components/card/Card";
import styled from "styled-components";
import colors from "../utils/style/colors";
import { Loader } from "../utils/style/Atoms";
import { useFetch } from "../utils/hooks/useFetch";
import useTheme from "../utils/hooks/useTheme";

const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export default function Freelances() {
  const { data, isLoading, error } = useFetch(
    "http://localhost:8001/freelances"
  );

  const {theme} = useTheme()

  const freelancersList  = data?.freelancersList;

  if (error) return <span>Oups, il y a un problème</span>;

  return (
    <div>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {isLoading ? (
        <LoaderWrapper>
          <Loader theme={theme}/>
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {freelancersList && freelancersList.map((profile, index) => (
            <Card
              key={`${profile.name}-${index}`}
              label={profile.jobTitle}
              title={profile.name}
              // picture={profile.picture}
            />
          ))}
        </CardsContainer>
      )}
    </div>
  );
}
