import { ExternalLink, Github } from 'lucide-react';

interface ProjectActionButtonsProps {
  projectTitle: string;
  liveUrl: string;
  githubUrl: string;
}

const ACTIONS = [
  { label: 'Live Demo', urlKey: 'liveUrl', Icon: ExternalLink },
  { label: 'GitHub', urlKey: 'githubUrl', Icon: Github },
] as const;

const ACTION_CLASS_NAME =
  'inline-flex items-center gap-2 border border-white bg-transparent px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black hover:font-extrabold';

function isValidUrl(url: string) {
  return url.trim() !== '' && url !== '#';
}

export default function ProjectActionButtons({
  projectTitle,
  liveUrl,
  githubUrl,
}: ProjectActionButtonsProps) {
  const urls = { liveUrl, githubUrl };

  return (
    <>
      {ACTIONS.map(({ label, urlKey, Icon }) => {
        const url = urls[urlKey];
        const content = (
          <>
            <Icon size={12} />
            {label}
          </>
        );

        return isValidUrl(url) ? (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={ACTION_CLASS_NAME}
            data-cursor-hover
            aria-label={`View ${projectTitle} ${label}`}
          >
            {content}
          </a>
        ) : (
          <span
            key={label}
            className={`${ACTION_CLASS_NAME} cursor-not-allowed`}
            aria-disabled="true"
            title={`${label} link is not available yet`}
            data-cursor-hover
          >
            {content}
          </span>
        );
      })}
    </>
  );
}
