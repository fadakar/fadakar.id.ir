import { JSX } from 'react';
import { ULItem, UlList, ULListImage } from '../types';
import LinkedText from './LinkedText';

interface Props {
  title: string;
  items: ULItem[];
}

const splitMeta = (text: string) => {
  const splitAt = text.indexOf(':');
  if (splitAt === -1 || splitAt > 28) return null;
  return {
    label: text.slice(0, splitAt).trim(),
    value: text.slice(splitAt + 1).trim(),
  };
};

const MetaLine = ({ text }: { text: string }) => {
  const meta = splitMeta(text);
  if (!meta) {
    return (
      <p className='text-sm leading-6 text-ink'>
        <LinkedText text={text} />
      </p>
    );
  }

  return (
    <div className='flex items-baseline justify-between gap-3 text-sm'>
      <span className='shrink-0 text-muted'>{meta.label}</span>
      <span className='min-w-0 text-right font-medium break-words text-ink'>
        <LinkedText text={meta.value} />
      </span>
    </div>
  );
};

const ULList: ({ title, items }: Props) => JSX.Element = ({ title, items }) => {
  const printValues = items
    .filter((item): item is string => typeof item === 'string')
    .map((item) => splitMeta(item)?.value ?? item);

  return (
    <div className='flex flex-col gap-2 print:gap-0.5'>
      <h3 className='text-sm font-semibold text-ink print:text-[12px]'>
        {title.replace(/:$/, '')}
      </h3>
      <p className='hidden text-[11px] leading-snug text-slate-800 print:block'>
        {printValues.join(' · ')}
      </p>
      <div className='flex flex-col gap-2 print:hidden'>
        {items.map((item, j) => {
          if (item instanceof ULListImage) {
            return (
              <a
                key={j}
                target='_blank'
                rel='noopener noreferrer'
                href={item.src}
                className='block'
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className='h-auto w-full rounded-lg border border-slate-200'
                />
              </a>
            );
          }

          if (item instanceof UlList) {
            return <ULList key={j} title={item.title} items={item.items} />;
          }

          return <MetaLine key={j} text={item} />;
        })}
      </div>
    </div>
  );
};
export default ULList;
