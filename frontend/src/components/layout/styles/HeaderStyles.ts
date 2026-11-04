import styled from 'styled-components';
import { InputGroup, FormControl, Button, Dropdown } from 'react-bootstrap';

export const StyledHeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 70px;
  background-color: #111827;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

export const StyledLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StyledLogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledLogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #3b82f6;
  border-radius: 8px;
`;

export const StyledLogoTitle = styled.h6`
  font-weight: bold;
  color: #fff;
  margin: 0;
  font-size: 18px;
  letter-spacing: 0.5px;
`;

export const StyledLogoSubtitle = styled.small`
  color: #3b82f6;
  margin: 0;
  font-size: 10px;
  letter-spacing: 0.5px;
`;

export const StyledMenuButton = styled.button`
  border: none;
  background: transparent;
  color: #fff;
  padding: 8px;
  font-size: 20px;
`;

export const StyledSearchArea = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 600px;
  margin: 0 24px;
`;

export const StyledSearchIcon = styled(InputGroup.Text)`
  background: transparent;
  border: 0;
  color: #6c757d;
  border-radius: none;
  font-size: 18px;
`;

export const StyledSearchInput = styled(FormControl)`
  height: 40px;
  background-color: #1e293b;
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: none;

  &::placeholder {
    color: #6c757d;
  }
`;

export const StyledSearchHint = styled(InputGroup.Text)`
  background: transparent;
  border: 0;
  color: #6c757d;
  cursor: pointer;
  font-size: 12px;
  font-family: monospace;
`;

export const StyledRightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledNewTaskButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #3b82f6;
  border-color: #3b82f6;
  padding: 8px 16px;
  font-size: 14px;
`;

export const StyledIconButton = styled.button`
  border: none;
  background: transparent;
  color: #6c757d;
  padding: 8px;
  font-size: 18px;
  position: relative;
`;

export const StyledNotificationBadge = styled.span`
  position: absolute;
  top: 0;
  start: 50%;
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  background-color: #dc3545;
  font-size: 10px;
  padding: 2px 5px;
`;

export const StyledThemeButton = styled.button`
  border: none;
  background: transparent;
  color: #6c757d;
  padding: 8px;
  font-size: 18px;
`;

export const StyledUserToggle = styled(Dropdown.Toggle)`
  color: #fff;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  background: transparent;
  border: none;

  &::after {
    display: none;
  }
`;

export const StyledUserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledAvatarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #0d6efd;
  color: #fff;
  font-weight: bold;
  width: 36px;
  height: 36px;
  font-size: 14px;
  overflow: hidden;
`;

export const StyledAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledUserInfo = styled.div`
  display: none;

  @media (min-width: 992px) {
    display: block;
  }
`;

export const StyledUserName = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`;

export const StyledUserEmail = styled.div`
  color: #6c757d;
  font-size: 11px;
`;

export const StyledChevron = styled.i`
  font-size: 12px;
  color: #6c757d;
`;

export const StyledMenu = styled(Dropdown.Menu)`
  background-color: #212529;
  border-color: #495057;
`;

export const StyledMenuItem = styled(Dropdown.Item)`
  color: #fff;
`;
