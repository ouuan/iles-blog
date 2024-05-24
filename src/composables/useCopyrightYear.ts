export function useCopyrightYearEndpoints(): [number, number] {
  const { site } = usePage();
  const { startedAt } = site;
  const startYear = startedAt.getFullYear();
  const currentYear = new Date().getFullYear();
  return [startYear, currentYear];
}

export function useCopyrightYearString(): string {
  const [startYear, currentYear] = useCopyrightYearEndpoints();
  return currentYear === startYear ? `${currentYear}` : `${startYear} - ${currentYear}`;
}

export function useCopyrightYearRange(): number[] {
  const [startYear, currentYear] = useCopyrightYearEndpoints();
  return Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
}
