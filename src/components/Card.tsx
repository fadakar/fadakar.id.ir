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
      className={`relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 print:overflow-visible print:rounded-none print:bg-transparent print:shadow-none print:ring-0 ${
        screenOnly ? 'print:hidden' : ''
      }`}
    >
      <div
        className={`border-b border-slate-200 bg-slate-50 print:border-b print:border-slate-900 print:bg-transparent print:px-0 print:py-1 ${
          dense ? 'px-3 py-2' : 'px-4 py-3 sm:px-5'
        }`}
      >
        <h2
          className={`font-semibold text-slate-800 print:text-[11px] print:font-bold print:uppercase print:tracking-wider ${
            dense ? 'text-sm' : 'text-base'
          }`}
        >
          {title}
        </h2>
      </div>
      <div className={dense ? 'p-3 print:px-0 print:py-1.5' : 'p-4 sm:p-5 print:px-0 print:py-1.5'}>
        {children}
      </div>
    </section>
  );
};
export default Card;
