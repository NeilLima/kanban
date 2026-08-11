import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(8px, 1vw, 12px);

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StyledLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(8px, 1vw, 12px);
  min-width: 0;
  flex: 1;
`;

export const StyledIconWrapper = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(28px, 3.5vw, 44px);
  height: clamp(28px, 3.5vw, 44px);
  background: ${props => props.$color};
  border-radius: clamp(8px, 1vw, 12px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  flex-shrink: 0;
`;

export const StyledIcon = styled.i`
  font-size: clamp(14px, 1.6vw, 22px);
  color: #fff;
`;

export const StyledProjectDetails = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const StyledTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.6vw, 8px);
  margin-bottom: 2px;
  flex-wrap: wrap;
`;

export const StyledTitle = styled.h2`
  color: #fff;
  font-size: clamp(13px, 1.5vw, 18px);
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledBadge = styled.span<{ $bgColor: string; $textColor: string; $borderColor: string }>`
  background-color: ${props => props.$bgColor};
  color: ${props => props.$textColor};
  border: 1px solid ${props => props.$borderColor};
  font-size: clamp(9px, 0.8vw, 11px);
  padding: clamp(2px, 0.3vw, 4px) clamp(6px, 0.6vw, 10px);
  border-radius: 4px;
  white-space: nowrap;
`;

export const StyledDescription = styled.p`
  color: #94a3b8;
  font-size: clamp(11px, 1vw, 13px);
  line-height: 1.3;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const StyledRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.6vw, 8px);
  flex-shrink: 0;
`;

export const StyledTeamContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledAvatar = styled.div<{ $bgColor: string; $marginLeft?: number }>`
  width: clamp(20px, 2.2vw, 28px);
  height: clamp(20px, 2.2vw, 28px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: clamp(8px, 0.8vw, 11px);
  border: 2px solid #0B1120;
  background: ${props => props.$bgColor};
  margin-left: ${props => props.$marginLeft || 0}px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const StyledAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledExtraBadge = styled.div`
  width: clamp(20px, 2.2vw, 28px);
  height: clamp(20px, 2.2vw, 28px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: clamp(7px, 0.7vw, 10px);
  border: 2px solid #0B1120;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  margin-left: -8px;
  flex-shrink: 0;
`;

export const StyledActionButton = styled.button<{ $variant?: 'outline' | 'icon' }>`
  display: flex;
  align-items: center;
  gap: clamp(4px, 0.5vw, 6px);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  padding: ${props => props.$variant === 'icon' ? '4px 8px' : '4px 10px'};
  font-size: ${props => props.$variant === 'icon' ? 'clamp(14px, 1.2vw, 18px)' : 'clamp(11px, 0.9vw, 14px)'};
  border-radius: 6px;
  cursor: pointer;
  line-height: ${props => props.$variant === 'icon' ? '1' : 'inherit'};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;