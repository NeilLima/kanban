import styled from 'styled-components';

export const StyledTeamCard = styled.div`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: clamp(12px, 1.4vw, 20px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  height: 100%;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const StyledTitle = styled.h6`
  color: #fff;
  font-size: clamp(13px, 1.2vw, 15px);
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    color: #3b82f6;
  }
`;

export const StyledLinkButton = styled.button`
  background: transparent;
  border: none;
  color: #3b82f6;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;

  i {
    font-size: 11px;
  }

  &:hover {
    color: #60a5fa;
  }
`;

export const StyledMemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledMemberRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  border-radius: 8px;
  background: #0b1120;
  border: 1px solid rgba(255, 255, 255, 0.04);
  transition: all 0.2s ease;

  &:hover {
    background: #263548;
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

export const StyledAvatarWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const StyledAvatar = styled.div<{ $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledOnlineDot = styled.span<{ $online: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #0b1120;
  background: ${(p) => (p.$online ? '#22c55e' : '#64748b')};
`;

export const StyledMemberInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StyledMemberName = styled.div`
  color: #f8fafc;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledMemberRole = styled.div`
  color: #94a3b8;
  font-size: 11.5px;
`;

export const StyledStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  flex-shrink: 0;
`;

export const StyledTaskCount = styled.span`
  color: #f8fafc;
  font-size: 12.5px;
  font-weight: 600;

  small {
    color: #64748b;
    font-weight: 400;
  }
`;

export const StyledWorkload = styled.span<{ $color: string }>`
  font-size: 10.5px;
  color: ${(p) => p.$color};
`;
