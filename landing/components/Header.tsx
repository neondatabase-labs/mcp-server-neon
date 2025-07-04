import Image from 'next/image';

import { Button } from '@/components/ui/button';
import githubSvg from '@/icons/github.svg';
import neonSvg from '@/icons/neon.svg';

type HeaderProps = {
  packageVersion: number;
};

export const Header = ({ packageVersion }: HeaderProps) => (
  <header className="flex items-center justify-between gap-2">
    <div className="flex items-center gap-3">
      <Image src={neonSvg} width={30} height={30} alt="Neon logo" />
      <div className="flex items-baseline gap-2">
        <h1 className="text-3xl font-bold whitespace-nowrap">Neon MCP</h1>{' '}
        version: {packageVersion}
      </div>
    </div>
    <div className="flex items-center gap-2">
      <a
        href="https://cursor.com/install-mcp?name=Neon&config=eyJ1cmwiOiJodHRwczovL21jcC5uZW9uLnRlY2gvc3NlIn0%3D"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt="Add to Cursor"
          src="https://cursor.com/deeplink/mcp-install-light.svg"
          className="invert dark:invert-0"
          width={126}
          height={32}
        />
      </a>

      <Button asChild size="xs">
        <a
          href="https://github.com/neondatabase-labs/mcp-server-neon?tab=readme-ov-file"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            alt=""
            src={githubSvg}
            className="invert dark:invert-0"
            width={16}
            height={16}
          />{' '}
          Github
        </a>
      </Button>
    </div>
  </header>
);
