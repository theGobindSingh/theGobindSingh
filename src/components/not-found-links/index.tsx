import { Link } from "@components/link";
import { headerAndNavData } from "@data";

const navLinkMapper = (link: (typeof headerAndNavData.links)[number]) => {
  return (
    <li key={link.url}>
      <Link href={link.url}>{link.text}</Link>
    </li>
  );
};

const NotFoundLinks = () => {
  return (
    <ul className="flex flex-wrap justify-center gap-4">
      {headerAndNavData.links.map(navLinkMapper)}
    </ul>
  );
};

export default NotFoundLinks;
