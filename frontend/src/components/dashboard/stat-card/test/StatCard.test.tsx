import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import StatCardComp from '../components/StatCardComp';

const mockStat = {
  id: '1',
  title: 'Projetos',
  value: 12,
  percentage: '20%',
  trend: 'up' as const,
  icon: 'bi bi-folder',
  color: '#3b82f6',
  backgroundColor: 'rgba(59, 130, 246, 0.1)',
  chartData: [10, 12, 8, 15, 11, 14, 12],
  chartColor: '#3b82f6',
};

describe('StatCardComp', () => {
  it('should render stat title', () => {
    render(<StatCardComp stat={mockStat} />);
    expect(screen.getByText('Projetos')).toBeInTheDocument();
  });

  it('should render stat value', () => {
    render(<StatCardComp stat={mockStat} />);
    expect(screen.getByText('12')).toBeInTheDocument();
  });
});