import styled from 'styled-components';

export const StyledTeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: clamp(12px, 1.4vw, 20px);
`;

export const StyledMemberCard = styled.div`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #263548;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

export const StyledMemberAvatar = styled.div<{ $color: string; $avatarUrl?: string }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${(p) => (p.$avatarUrl ? 'transparent' : `linear-gradient(135deg, ${p.$color} 0%, ${p.$color}99 100%)`)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  border: 3px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 6px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: ${(p) => (p.$avatarUrl ? 'block' : 'none')};
  }
`;

export const StyledMemberName = styled.h6`
  color: #f8fafc;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StyledMemberYou = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #3b82f6;
  opacity: 0.9;
`;

export const StyledMemberRole = styled.span`
  font-size: 12px;
  color: #94a3b8;
`;

export const StyledMemberEmail = styled.span`
  font-size: 11px;
  color: #64748b;
`;

export const StyledMemberStats = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 10px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  width: 100%;
  justify-content: center;
`;

export const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledStatValue = styled.span<{ $color: string }>`
  font-size: 15px;
  font-weight: 700;
  color: ${(p) => p.$color};
`;

export const StyledStatLabel = styled.span`
  font-size: 10px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledRoleBadge = styled.span<{ $color: string }>`
  font-size: 10px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  background: ${(p) => p.$color}20;
  color: ${(p) => p.$color};
  border: 1px solid ${(p) => p.$color}40;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;
