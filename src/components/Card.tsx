import { JSX, ReactNode } from 'react';
interface Props {
  children?: ReactNode;
  title: string;
}
const Card: ({ children, title }: Props) => JSX.Element = ({ children, title }) => {
  return (
    <div
      className='relative bg-white rounded-lg ring-[1.5px] ring-gray-300 shadow-md overflow-hidden
                 print:rounded-none print:ring-0 print:shadow-none print:overflow-visible print:bg-white print:border print:border-gray-300 print:break-inside-avoid'
    >
      <div className='flex flex-col gap-2 border-b border-b-gray-200 p-4 bg-gray-100 print:bg-gray-100 print:border-b-gray-300 print:p-2 print:break-inside-avoid print:break-after-avoid'>
        <div className='flex '>
          <div className='text-gray-600 font-bold print:text-base'>{title}</div>
        </div>
      </div>
      <div className='p-4 pb-6 print:p-2 print:pb-3'>{children}</div>
    </div>
  );
};
export default Card;
