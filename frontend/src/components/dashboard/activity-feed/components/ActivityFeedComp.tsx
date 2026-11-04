'use client';
import React from 'react';
import {
  StyledActivityCard,
  StyledHeader,
  StyledTitle,
  StyledLinkButton,
  StyledTimeline,
  StyledItem,
  StyledIconBubble,
  StyledContent,
  StyledText,
  StyledTime,
} from '../styles/ActivityFeedStyles';
import { useActivityFeed, getTypeIcon, getTimeAgo } from '../utils/ActivityFeedUtils';

export default function ActivityFeedComp() {
  const { state, actions } = useActivityFeed();

  return (
    <StyledActivityCard>
      <StyledHeader>
        <StyledTitle>
          <i className="bi bi-activity"></i>
          Atividades Recentes
        </StyledTitle>
        <StyledLinkButton onClick={actions.viewAll} data-testid="activity-see-all">Ver todas</StyledLinkButton>
      </StyledHeader>

      <StyledTimeline>
        {state.activities.map((activity) => (
          <StyledItem key={activity.id}>
            <StyledIconBubble $color={activity.userColor} title={activity.userName}>
              <i className={`bi ${getTypeIcon(activity.type)}`}></i>
            </StyledIconBubble>
            <StyledContent>
              <StyledText>
                <strong>{activity.userName}</strong> {activity.action}{' '}
                <span>&ldquo;{activity.target}&rdquo;</span>
              </StyledText>
              <StyledTime>{getTimeAgo(activity.timestamp)}</StyledTime>
            </StyledContent>
          </StyledItem>
        ))}
      </StyledTimeline>
    </StyledActivityCard>
  );
}
