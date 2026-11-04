import styled from 'styled-components';

export const StyledCard = styled.div<{ $color: string }>`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: clamp(10px, 1vw, 14px);
  padding: clamp(14px, 1.2vw, 18px);
  transition: all 0.25s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${(p) => p.$color};
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
    border-color: ${(p) => p.$color}40;
  }
`;

export const StyledCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
`;

export const StyledProjectIcon = styled.div<{ $color: string }>`
  width: clamp(36px, 3.5vw, 44px);
  height: clamp(36px, 3.5vw, 44px);
  border-radius: 10px;
  background: ${(p) => p.$color}22;
  border: 1px solid ${(p) => p.$color}40;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.$color};
  font-size: clamp(16px, 1.6vw, 20px);
  flex-shrink: 0;
`;

export const StyledFavoriteButton = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  color: ${(p) => (p.$active ? '#fbbf24' : '#64748b')};
  font-size: 18px;
  cursor: pointer;
  padding: 2px;
  transition: color 0.2s ease;

  &:hover {
    color: #fbbf24;
  }
`;

export const StyledCardTitle = styled.h3`
  color: #f8fafc;
  font-size: clamp(13px, 1.3vw, 16px);
  font-weight: 600;
  margin: 0;
`;

export const StyledCardDescription = styled.p`
  color: #94a3b8;
  font-size: clamp(11px, 1vw, 13px);
  line-height: 1.4;
  margin: 6px 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StyledProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const StyledProgressTrack = styled.div`
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
`;

export const StyledProgressFill = styled.div<{ $color: string; $width: number }>`
  height: 100%;
  width: ${(p) => p.$width}%;
  border-radius: 3px;
  background: ${(p) => p.$color};
  transition: width 0.4s ease;
`;

export const StyledProgressValue = styled.span`
  color: #94a3b8;
  font-size: 11px;
  min-width: 36px;
  text-align: right;
`;

export const StyledCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const StyledAvatarGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledAvatar = styled.div<{ $color: string }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  border: 2px solid #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  margin-left: -8px;

  &:first-child {
    margin-left: 0;
  }
`;

export const StyledTaskInfo = styled.span`
  color: #64748b;
  font-size: 11px;
`;

export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StyledIconButton = styled.button`
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    color: #f8fafc;
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const StyledArchiveButton = styled(StyledIconButton)`
  &:hover {
    color: #f59e0b;
  }
`;

export const StyledDeleteButton = styled(StyledIconButton)`
  &:hover {
    color: #ef4444;
  }
`;