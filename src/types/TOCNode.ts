export default interface TOCNode {
  level: number;
  title: string;
  slug: string;
  open: boolean;
  current: boolean;
  children: TOCNode[];
  parent: TOCNode | null;
}
