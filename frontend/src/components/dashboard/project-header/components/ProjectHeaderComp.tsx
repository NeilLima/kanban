'use client';
import React from 'react';
import { useProjectHeader } from '../utils/ProjectHeaderUtils';
import {
  StyledHeader,
  StyledLeftSection,
  StyledIconWrapper,
  StyledIcon,
  StyledProjectDetails,
  StyledTitleRow,
  StyledTitle,
  StyledBadge,
  StyledDescription,
  StyledRightSection,
  StyledTeamContainer,
  StyledAvatar,
  StyledAvatarImg,
  StyledExtraBadge,
  StyledActionButton,
} from '../styles/ProjectHeaderStyles';

export default function ProjectHeaderComp() {
  const { state, actions, extraCount } = useProjectHeader();
  const { project, teamMembers } = state;

  return (
    <StyledHeader>
      <StyledLeftSection>
        <StyledIconWrapper $color="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)">
          <StyledIcon className="bi bi-rocket-takeoff" />
        </StyledIconWrapper>

        <StyledProjectDetails>
          <StyledTitleRow>
            <StyledTitle>{project.name}</StyledTitle>
            <StyledBadge
              $bgColor="rgba(59, 130, 246, 0.15)"
              $textColor="#3b82f6"
              $borderColor="rgba(59, 130, 246, 0.3)"
            >
              {project.status}
            </StyledBadge>
          </StyledTitleRow>
          <StyledDescription>{project.description}</StyledDescription>
        </StyledProjectDetails>
      </StyledLeftSection>

      <StyledRightSection>
        <StyledTeamContainer>
          {teamMembers.map((member, index) => (
            <StyledAvatar
              key={member.name}
              $bgColor={member.color}
              $marginLeft={index > 0 ? -8 : 0}
            >
              {member.avatar ? (
                <StyledAvatarImg src={member.avatar} alt={member.name} />
              ) : (
                member.initial
              )}
            </StyledAvatar>
          ))}
          <StyledExtraBadge>+{extraCount}</StyledExtraBadge>
        </StyledTeamContainer>

        <StyledActionButton onClick={actions.handleShare} data-testid="project-share-btn">
          <i className="bi bi-people"></i>
          <span className="d-none d-md-inline">Compartilhar</span>
        </StyledActionButton>

        <StyledActionButton
          $variant="icon"
          onClick={actions.handleMoreOptions}
          data-testid="project-more-btn"
        >
          ⋯
        </StyledActionButton>
      </StyledRightSection>
    </StyledHeader>
  );
}