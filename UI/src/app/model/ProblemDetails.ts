export interface ProblemDetails
{
  detail: string;
  errors: Record<string, string[]>;
  instance: string;
  status: number;
  title: string;
  type: string;
}