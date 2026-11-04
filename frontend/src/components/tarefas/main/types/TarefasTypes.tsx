export interface TarefasTypes {
  projectId: string;
}

export interface TarefasState {
  projectId: string;
  loading: boolean;
  showCreate: boolean;
}

export interface TarefasActions {
  handleNovaTarefa: () => void;
  handleFecharCreate: () => void;
  handleAbrirCreate: () => void;
}
