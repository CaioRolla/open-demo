export const jsonTransformer = {
  to(data: Record<string, any> | null): string {
    return data ? JSON.stringify(data) : null;
  },
  from(data: string): Record<string, any> | null {
    return data ? JSON.parse(data) : null;
  },
};
