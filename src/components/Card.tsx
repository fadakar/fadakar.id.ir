import {FC, ReactNode} from "react";


interface Props {
  children?: ReactNode,
  title: string,
}

const Card: FC<Props> = ({children, title}) => {
  return (
    <div
      className="relative bg-white rounded-lg ring-[1.5px] ring-gray-300 shadow-md overflow-hidden">
      <div className="flex flex-col gap-2 border-b border-b-gray-200 p-4 bg-gray-100 print:bg-gray-200">
        <div className="flex ">
          <div className="text-gray-600 font-bold">
            {title}
          </div>
        </div>
      </div>

      <div className="p-4 pb-6">
        {children}
      </div>
    </div>
  )
}

export default Card;
