import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProjectHeaderComp from '../components/ProjectHeaderComp';

describe('ProjectHeaderComp', () => {
  it('should render project name', () => {
    render(<ProjectHeaderComp />);
    expect(screen.getByText('Plataforma Nexus')).toBeInTheDocument();
  });
});