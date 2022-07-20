export default function useCopyrightYear() {
  const { site } = usePage();
  const { startYear } = site;
  const year = new Date().getFullYear();
  return year === startYear ? `${startYear}` : `${startYear} - ${year}`;
}
