import styled from 'styled-components';

export const StyledUserCard = styled.div`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
`;

export const StyledUserAvatar = styled.div<{ $color: string; $avatarUrl?: string }>`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: ${(p) => (p.$avatarUrl ? 'transparent' : `linear-gradient(135deg, ${p.$color} 0%, ${p.$color}99 100%)`)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  border: 3px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 4px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: ${(p) => (p.$avatarUrl ? 'block' : 'none')};
  }
`;

export const StyledUserName = styled.h2`
  color: #f8fafc;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledUserMe = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #3b82f6;
`;

export const StyledUserEmail = styled.span`
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 20px;
  display: block;
`;

export const StyledUserRole = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledUserStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

export const StyledUserStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const StyledUserStatValue = styled.span<{ $color: string }>`
  font-size: 20px;
  font-weight: 700;
  color: ${(p) => p.$color};
`;

export const StyledUserStatLabel = styled.span`
  font-size: 11px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
`;

export const StyledEmptyText = styled.p`
  color: #64748b;
  font-size: 14px;
  margin: 0 0 12px 0;
`;
