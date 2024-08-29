export function ColContentList({ contList }: { contList: string[] }) {
  return contList.map((content) => <li className="cont-il">{content}</li>);
}
