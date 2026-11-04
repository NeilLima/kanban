import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DetailComp from '../components/DetailComp';

describe('DetailComp', () => {
  it('should render task title', () => {
    render(<DetailComp taskId="task-1" onClose={() => {}} />);
    expect(screen.getByText('Desenvolver dashboard principal')).toBeInTheDocument();
  });
});