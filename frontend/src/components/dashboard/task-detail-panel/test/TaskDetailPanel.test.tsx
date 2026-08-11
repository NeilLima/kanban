import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TaskDetailPanelComp from '../components/TaskDetailPanelComp';

describe('TaskDetailPanelComp', () => {
  it('should render task title', () => {
    render(<TaskDetailPanelComp taskId="task-1" onClose={() => {}} />);
    expect(screen.getByText('Desenvolver dashboard principal')).toBeInTheDocument();
  });
});