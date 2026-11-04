import styled from 'styled-components';

export const StyledCalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const StyledMonthTitle = styled.h5`
  color: #fff;
  font-size: clamp(14px, 1.4vw, 17px);
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledNavButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;

export const StyledCalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

export const StyledWeekDay = styled.div`
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 0;
`;

export const StyledDayCell = styled.div<{ $currentMonth: boolean; $isToday: boolean }>`
  min-height: clamp(70px, 9vw, 110px);
  background: ${(p) => (p.$currentMonth ? '#0b1120' : 'transparent')};
  border: 1px solid ${(p) => (p.$isToday ? '#3b82f6' : 'rgba(255, 255, 255, 0.05)')};
  border-radius: 8px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: ${(p) => (p.$currentMonth ? '#111827' : 'transparent')};
  }
`;

export const StyledDayNumber = styled.span<{ $currentMonth: boolean; $isToday: boolean }>`
  font-size: 12px;
  font-weight: ${(p) => (p.$isToday ? 700 : 500)};
  color: ${(p) => (p.$isToday ? '#3b82f6' : p.$currentMonth ? '#f8fafc' : '#475569')};
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(p) => (p.$isToday ? 'rgba(59, 130, 246, 0.15)' : 'transparent')};
`;

export const StyledEvent = styled.div<{ $color: string }>`
  font-size: 10px;
  font-weight: 500;
  color: #fff;
  background: ${(p) => p.$color};
  border-radius: 4px;
  padding: 2px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: default;
`;

export const StyledUpcomingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledUpcomingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #0b1120;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

export const StyledUpcomingDate = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 44px;
  border-radius: 8px;
  background: ${(p) => p.$color}20;
  border: 1px solid ${(p) => p.$color}40;
`;

export const StyledUpcomingDay = styled.span<{ $color: string }>`
  font-size: 15px;
  font-weight: 700;
  color: ${(p) => p.$color};
  line-height: 1;
`;

export const StyledUpcomingMonth = styled.span<{ $color: string }>`
  font-size: 9px;
  font-weight: 600;
  color: ${(p) => p.$color};
  text-transform: uppercase;
`;

export const StyledUpcomingTitle = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #f8fafc;
`;

export const StyledUpcomingProject = styled.span`
  font-size: 11px;
  color: #94a3b8;
`;
