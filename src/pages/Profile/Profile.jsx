import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useFetch } from "../../utils/hooks/useFetch";
import useTheme from "../../utils/hooks/useTheme";
import colors from "../../utils/style/colors";
import { Loader } from "../../utils/style/Atoms";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 90px 0;
  margin: 0 90px;
  background-color: ${({ theme }) =>
    theme === "light" ? colors.backgroundLight : colors.backgroundDark};
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  color: ${({ theme }) => (theme === "light" ? colors.dark : "white")};
`;

const Picture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`;

const Title = styled.h1`
  font-size: 25px;
  margin: 0;
  font-weight: 500;
`;

const JobTitle = styled.h2`
  padding-top: 10px;
  font-size: 20px;
  margin: 0;
  font-weight: 500;
`;

const Location = styled.span`
  margin-left: 15px;
  color: ${colors.secondary};
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Price = styled.span`
  padding-top: 10px;
  font-weight: 500;
  font-size: 20px;
`;

const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
`;

const Skill = styled.span`
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
  border: 1px solid
    ${({ theme }) => (theme === "light" ? colors.dark : "white")};
`;

const Availability = styled.span`
  &:before {
    position: absolute;
    left: 0;
    top: 4px;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${({ available }) => (available ? "green" : "red")};
    content: "";
  }
  padding-left: 20px;
  position: relative;
`;

const LoaderWrapper = styled.div`
width: 100%
    display: flex: 
    justify-content: center
`;

export default function Profile() {
  const { id } = useParams();
  const { theme } = useTheme();

  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/freelance?id=${id}`
  );

  const freelancerData = data?.freelanceData;

  //   const { picture, name, location, job, skills, available, tjm } = freelancerData;

  if (error) return <span>Oups, il y a un problème</span>;

  return (
    <ProfileWrapper theme={theme}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Picture
            src={freelancerData.picture}
            alt={freelancerData.name}
            height={150}
            width={150}
          />
          <ProfileDetails theme={theme}>
            <TitleWrapper>
              <Title>{freelancerData.name}</Title>
              <Location>{freelancerData.location}</Location>
            </TitleWrapper>
            <JobTitle>{freelancerData.job}</JobTitle>
            <SkillsWrapper>
              {freelancerData.skills &&
                freelancerData.skills.map((skill) => (
                  <Skill key={`skill-${skill}-${id}`} theme={theme}>
                    {skill}
                  </Skill>
                ))}
            </SkillsWrapper>
            <Availability available={freelancerData.available}>
              {freelancerData.available
                ? "Disponible maintenant"
                : "Indisponible"}
            </Availability>
            <Price>{freelancerData.tjm} € / jour</Price>
          </ProfileDetails>
        </>
      )}
    </ProfileWrapper>
  );
}
