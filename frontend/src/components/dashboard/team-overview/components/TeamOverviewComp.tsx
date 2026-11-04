'use client';
import React from 'react';
import {
  StyledTeamCard,
  StyledHeader,
  StyledTitle,
  StyledLinkButton,
  StyledMemberList,
  StyledMemberRow,
  StyledAvatarWrapper,
  StyledAvatar,
  StyledMemberInfo,
  StyledMemberName,
  StyledMemberRole,
  StyledStats,
  StyledTaskCount,
  StyledWorkload,
} from '../styles/TeamOverviewStyles';
import { useTeamOverview } from '../utils/TeamOverviewUtils';

export default function TeamOverviewComp() {
  const { state, actions } = useTeamOverview();

  return (
    <StyledTeamCard>
      <StyledHeader>
        <StyledTitle>
          <i className="bi bi-people"></i>
          Equipe
        </StyledTitle>
        <StyledLinkButton onClick={actions.viewTeam} data-testid="team-see-all">
          Ver equipe
          <i className="bi bi-arrow-right ms-1"></i>
        </StyledLinkButton>
      </StyledHeader>

      <StyledMemberList>
        {state.members.map((member) => (
          <StyledMemberRow
            key={member.id}
            onClick={actions.viewTeam}
            data-testid="team-member-row"
          >
            <StyledAvatarWrapper>
              <StyledAvatar $color={member.color}>{member.initials}</StyledAvatar>
            </StyledAvatarWrapper>
            <StyledMemberInfo>
              <StyledMemberName>{member.name}</StyledMemberName>
              <StyledMemberRole>{member.role}</StyledMemberRole>
            </StyledMemberInfo>
            <StyledStats>
              <StyledTaskCount>
                {member.tasksDone}<small>/{member.tasksTotal} tarefas</small>
              </StyledTaskCount>
              <StyledWorkload $color={member.workloadColor}>{member.workloadLabel}</StyledWorkload>
            </StyledStats>
          </StyledMemberRow>
        ))}
      </StyledMemberList>
    </StyledTeamCard>
  );
}
