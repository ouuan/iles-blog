export default function useCopyrightYear() {
  const { site } = usePage();
  const { startedAt } = site;
  const startYear = startedAt.getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear === startYear ? `${currentYear}` : `${startYear} - ${currentYear}`;
}
