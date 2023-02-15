export const numberTransformer = {
  to(data: number): number {
    return data;
  },
  from(data: string | null): number | null {
    return data ? parseFloat(data) : null;
  },
};
