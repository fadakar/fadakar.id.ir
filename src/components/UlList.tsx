import { JSX } from 'react';
import { ULItem, UlList, ULListImage } from '../types';
interface Props {
  title: string;
  items: ULItem[];
}
const ULList: ({ title, items }: Props) => JSX.Element = ({ title, items }) => {
  const renderText = (item: any) => {
    if (item instanceof ULListImage) {
      return (
        <a target='_blank' href={item.src} className='block w-full print:hidden'>
          <img src={item.src} alt={item.alt} className='w-full h-auto rounded' />
        </a>
      );
    } else if (item instanceof UlList) {
      return <ULList title={item.title} items={item.items} />;
    }
    return item;
  };
  return (
    <div className='flex flex-col gap-2 print:gap-1'>
      <div className='font-bold text-gray-500 print:text-sm'>{title}</div>
      <div className='ml-10 print:ml-6'>
        <ul className='list-disc text-gray-500 text-sm print:text-xs text-wrap'>
          {items.map((item, j) => {
            const isImage = item instanceof ULListImage;
            return (
              <li
                key={j}
                style={{ paddingBottom: '.2rem' }}
                className={`print:break-inside-avoid ${isImage ? 'list-none -ml-4 print:my-0 print:hidden' : ''}`}
              >
                {renderText(item)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default ULList;
