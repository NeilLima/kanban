'use client';
import React from 'react';
import { InputGroup, Dropdown } from 'react-bootstrap';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useUnreadCountService } from '@/components/layout/services/HeaderServices';
import { getInitials, getDisplayName } from '@/components/layout/utils/HeaderUtils';
import {
  StyledHeaderBar,
  StyledLeftSection,
  StyledLogoArea,
  StyledLogoBox,
  StyledLogoTitle,
  StyledLogoSubtitle,
  StyledMenuButton,
  StyledSearchArea,
  StyledSearchIcon,
  StyledSearchInput,
  StyledSearchHint,
  StyledRightActions,
  StyledNewTaskButton,
  StyledIconButton,
  StyledNotificationBadge,
  StyledThemeButton,
  StyledUserToggle,
  StyledUserArea,
  StyledAvatarBox,
  StyledAvatarImg,
  StyledUserInfo,
  StyledUserName,
  StyledUserEmail,
  StyledChevron,
  StyledMenu,
  StyledMenuItem,
} from '@/components/layout/styles/HeaderStyles';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();
  const { unreadCount } = useUnreadCountService();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const displayName = getDisplayName(user);

  return (
    <StyledHeaderBar>
      <StyledLeftSection>
        <StyledLogoArea>
          <StyledLogoBox>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </StyledLogoBox>
          <div>
            <StyledLogoTitle>NEXUS</StyledLogoTitle>
            <StyledLogoSubtitle>KANBAN</StyledLogoSubtitle>
          </div>
        </StyledLogoArea>

        <StyledMenuButton data-testid="header-menu-btn">☰</StyledMenuButton>
      </StyledLeftSection>

      <StyledSearchArea>
        <InputGroup>
          <StyledSearchIcon>🔍</StyledSearchIcon>
          <StyledSearchInput
            placeholder="Buscar tarefas, projetos, membros..."
            size="sm"
            data-testid="header-search-input"
          />
          <StyledSearchHint>⌘K</StyledSearchHint>
        </InputGroup>
      </StyledSearchArea>

      <StyledRightActions>
        <StyledNewTaskButton data-testid="header-new-task-btn">+ Nova Tarefa</StyledNewTaskButton>

        <StyledIconButton data-testid="header-notifications-btn">
          🔔
          {unreadCount > 0 && (
            <StyledNotificationBadge data-testid="header-notifications-count">
              {unreadCount}
            </StyledNotificationBadge>
          )}
        </StyledIconButton>

        <StyledIconButton data-testid="header-help-btn">❓</StyledIconButton>

        <StyledThemeButton data-testid="header-theme-toggle" onClick={toggleTheme}>
          {theme.mode === 'dark' ? '☀️' : '🌙'}
        </StyledThemeButton>

        <Dropdown>
          <StyledUserToggle data-testid="header-user-menu">
            <StyledUserArea>
              <StyledAvatarBox>
                {user?.avatar ? (
                  <StyledAvatarImg src={user.avatar} alt="Avatar" />
                ) : (
                  getInitials(displayName)
                )}
              </StyledAvatarBox>
              <StyledUserInfo>
                <StyledUserName>{displayName}</StyledUserName>
                <StyledUserEmail>{user?.email}</StyledUserEmail>
              </StyledUserInfo>
              <StyledChevron className="bi bi-chevron-down"></StyledChevron>
            </StyledUserArea>
          </StyledUserToggle>
          <StyledMenu>
            <StyledMenuItem data-testid="header-profile-item">Perfil</StyledMenuItem>
            <StyledMenuItem data-testid="header-settings-item">Configurações</StyledMenuItem>
            <Dropdown.Divider />
            <StyledMenuItem
              data-testid="header-logout-item"
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            >
              Sair
            </StyledMenuItem>
          </StyledMenu>
        </Dropdown>
      </StyledRightActions>
    </StyledHeaderBar>
  );
}
