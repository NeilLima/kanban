import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectsComp from '../components/ProjectsComp';

describe('ProjectsComp', () => {
  it('deve renderizar o título da página', () => {
    render(<ProjectsComp />);
    expect(screen.getByText('Projetos')).toBeInTheDocument();
  });

  it('deve renderizar o botão de novo projeto', () => {
    render(<ProjectsComp />);
    expect(screen.getByText('Novo Projeto')).toBeInTheDocument();
  });
});