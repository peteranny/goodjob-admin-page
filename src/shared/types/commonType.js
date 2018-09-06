export type Company = {
  id: string,
  name?: string
};

export type Salary = {
  type: SalaryType,
  amount: number
};

type SalaryType = 'year' | 'month' | 'day' | 'hour';

export type Archive = {
  is_archived: boolean,
  reason: ArchiveReason
};

type ArchiveReason = 'SOME_REASON'; // TODO: complete it
