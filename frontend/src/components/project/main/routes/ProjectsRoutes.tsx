export const projectsRoutes = {
  list: '/projects',
  detail: (id: string) => `/projects/${id}`,
  edit: (id: string) => `/projects/${id}/edit`,
};