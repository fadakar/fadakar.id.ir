import { Fragment, type ReactNode } from 'react';

interface Props {
  text: string;
}

const DOMAIN = /\b(?:[a-z0-9-]+\.)+[a-z]{2,}\b/gi;

const LinkedText = ({ text }: Props) => {
  const nodes: ReactNode[] = [];
  const pattern = new RegExp(DOMAIN.source, 'gi');
  let last = 0;

  for (const match of text.matchAll(pattern)) {
    const domain = match[0];
    const index = match.index ?? 0;
    if (index > last) {
      nodes.push(<Fragment key={`t-${last}`}>{text.slice(last, index)}</Fragment>);
    }
    nodes.push(
      <a
        key={`${domain}-${index}`}
        href={`https://${domain}`}
        target='_blank'
        rel='noopener noreferrer'
        className='font-medium text-blue-700 underline decoration-blue-200 underline-offset-2 hover:decoration-blue-700'
      >
        {domain}
      </a>,
    );
    last = index + domain.length;
  }

  if (last < text.length) {
    nodes.push(<Fragment key={`t-${last}`}>{text.slice(last)}</Fragment>);
  }

  if (nodes.length === 0) return <>{text}</>;
  return <>{nodes}</>;
};

export default LinkedText;
