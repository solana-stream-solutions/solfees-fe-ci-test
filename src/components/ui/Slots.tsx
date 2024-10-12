import {CommitmentStatus} from "../../store/websocketStore.ts";
import {IconPropView} from "@consta/icons/Icon";
import {IconRoute} from "@consta/icons/IconRoute";
import {IconCheck} from "@consta/icons/IconCheck";
import {IconAllDone} from "@consta/icons/IconAllDone";
import {AnimateIconBase} from "@consta/icons/AnimateIconBase";
import {MouseEventHandler, ReactNode, useRef, useState} from "react";
import {IconCopy} from "@consta/icons/IconCopy";


interface Props {
  items: {
    commitment: CommitmentStatus,
    slot: number
  }[]
}

type ComProps = {
  value: CommitmentStatus
}


const statuses: CommitmentStatus[] = ['processed', 'confirmed', 'finalized']
const colors: IconPropView[] = ['ghost', 'primary', 'success']
const icons = [IconRoute, IconCheck, IconAllDone]
export const AnimateIconBaseIcons = ({value}: ComProps) => {
  return null;
  const idx = statuses.findIndex(elt => elt === value)
  return (<AnimateIconBase
    className="shrink-0"
    view={colors[idx] || 'alert'}
    icons={icons}
    activeIndex={icons[idx] ? idx : 0}
  />);
};

interface CopyButtonProps {
  value: number
}

function copyToClipboard(text: string): void {
  const textarea = document.createElement("textarea");
  textarea.textContent = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}


const SlotWithCopy = ({value}: CopyButtonProps): ReactNode => {
  const [isTouched, setIsTouched] = useState(false);
  const timeoutId = useRef(0);

  const onCopyHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (isTouched) return;
    copyToClipboard(`${value}`);
    setIsTouched(true);
    timeoutId.current = +setTimeout(() => setIsTouched(false), 2000)
    const target = e.nativeEvent.target as HTMLElement;
    if(target.nodeName !== 'A') e.preventDefault();
  }
  return <a href={`https://explorer.solana.com/block/${value}`} target="_blank" className="hover:underline items-center flex-nowrap flex gap-1"
            onClick={onCopyHandler}>
    {value.toLocaleString('en-US')}
    {isTouched ? <IconCheck size="xs" view="success"/> :
      <IconCopy size="xs" view="secondary" />}
  </a>
}


export const Slots = ({items}: Props) => {
  return <div className="px-3">
    {items.map((elt) => <span
      key={elt.slot} className="flex flex-nowrap justify-between gap-1 items-center">
        <AnimateIconBaseIcons value={elt.commitment}/>
        <SlotWithCopy value={elt.slot}/>
      </span>)}
      </div>
}