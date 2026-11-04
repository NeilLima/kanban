import { useState, useCallback } from 'react';
import type { CreateProjectData, Project } from '@/components/project/main/types/ProjectsTypes';
import type { ProjectModalState } from '../types/ProjectModalTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const ESTADO_INICIAL: ProjectModalState = {
  name: '',
  description: '',
  color: '#3b82f6',
};

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useProjectModal(
  onClose: () => void,
  onCreate: (data: CreateProjectData) => void,
  project?: Project,
  onUpdate?: (id: string, data: CreateProjectData) => void,
) {
  const [form, setForm] = useState<ProjectModalState>(
    project
      ? {
          name: project.name,
          description: project.description || '',
          color: project.color || '#3b82f6',
        }
      : ESTADO_INICIAL,
  );

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const handleNameChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, name: value }));
  }, []);

  const handleDescriptionChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, description: value }));
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setForm((prev) => ({ ...prev, color }));
  }, []);

  const handleCancel = useCallback(() => {
    setForm({ name: '', description: '', color: '#3b82f6' });
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    if (!form.name.trim()) return;
    const dados: CreateProjectData = {
      name: form.name.trim(),
      description: form.description.trim() || undefined,
      color: form.color,
    };
    if (project && onUpdate) {
      onUpdate(project.id, dados);
    } else {
      onCreate(dados);
    }
    handleCancel();
  }, [form, project, onUpdate, onCreate, handleCancel]);

  return {
    state: form,
    actions: {
      handleNameChange,
      handleDescriptionChange,
      handleColorChange,
      handleCancel,
      handleSubmit,
    },
  };
}