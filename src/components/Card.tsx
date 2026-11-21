import { JSX, ReactNode } from 'react';
interface Props {
  children?: ReactNode;
  title: string;
  id?: string;
  dense?: boolean;
  screenOnly?: boolean;
}
const Card: ({ children, title, id, dense, screenOnly }: Props) => JSX.Element = ({
  children,
  title,
  id,
  dense,
  screenOnly,
}) => {
  return (
    <section
      id={id}
      className={`scroll-mt-24 rounded-2xl bg-card ring-1 ring-line print:rounded-none print:bg-transparent print:ring-0 ${
        screenOnly ? 'print:hidden' : ''
      }`}
    >
      <div className='border-b border-line px-5 py-3.5 print:border-black print:px-0 print:py-1'>
        <h2 className='text-base font-semibold text-ink print:text-sm print:text-black'>{title}</h2>
      </div>
      <div className={dense ? 'px-5 pt-3 pb-4 print:px-0 print:py-1.5' : 'px-5 pt-4 pb-5 print:px-0 print:py-1.5'}>
        {children}
      </div>
    </section>
  );
};
export default Card;
