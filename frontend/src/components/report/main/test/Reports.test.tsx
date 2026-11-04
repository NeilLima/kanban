import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReportsComp from '../components/ReportsComp';

describe('ReportsComp', () => {
  it('deve renderizar o título da página', () => {
    render(<ReportsComp />);
    expect(screen.getByText('Relatórios')).toBeInTheDocument();
  });
});