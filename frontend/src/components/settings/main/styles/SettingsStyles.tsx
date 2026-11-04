import styled from 'styled-components';

export const StyledSettingsContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const StyledSettingsTitle = styled.h1`
  color: #f8fafc;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const StyledSettingsCard = styled.div`
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 24px;
`;

export const StyledSettingsLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 8px;
`;

export const StyledSettingsInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #0f172a;
  color: #f8fafc;
  font-size: 14px;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const StyledSettingsButton = styled.button`
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;
