import styled from 'styled-components';

export const StyledProfileContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const StyledProfileTitle = styled.h1`
  color: #f8fafc;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const StyledProfileCard = styled.div`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
`;

export const StyledProfileAvatar = styled.div<{ $avatarUrl?: string }>`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: ${(p) => (p.$avatarUrl ? 'transparent' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  border: 3px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: ${(p) => (p.$avatarUrl ? 'block' : 'none')};
  }
`;

export const StyledProfileName = styled.h2`
  color: #f8fafc;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

export const StyledProfileEmail = styled.span`
  font-size: 14px;
  color: #94a3b8;
`;

export const StyledProfileRole = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
  text-transform: uppercase;
`;
