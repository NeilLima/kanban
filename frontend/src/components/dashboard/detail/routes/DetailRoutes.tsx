export const DetailRoutes = {
  view: (taskId: string) => `/task/${taskId}`,
  edit: (taskId: string) => `/task/${taskId}/edit`,
  list: '/tasks',
};