import {FC} from "react";
import {ULItem, ULListImage} from "../types";


interface Props {
  title: string,
  items: ULItem[],
}

const ULList: FC<Props> = ({title, items}) => {


  const renderText = (item: any) => {
    if (item instanceof ULListImage) {
      return (
        <a target="_blank" href={item.src}>
          <img src={item.src} alt={item.alt}/>
        </a>
      )
    }

    return item;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold text-gray-500">{title}</div>
      <div className="ml-10">
        <ul className="list-disc text-gray-500 text-sm print:text-lg text-wrap">
          {items.map((item, j) => {
            return (
              <li key={j} style={{paddingBottom: '.2rem'}}>
                {renderText(item)}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default ULList;
