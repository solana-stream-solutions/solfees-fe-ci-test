import type {FunctionComponent} from "../common/types";
import {Fragment, useEffect, useState} from "react";
import {useWebSocketStore} from "../store/websocketStore.ts";

type ComProps = {
  commitment: 'processed' | 'confirmed' | 'finalized';
}

function getIcon(c: 'processed' | 'confirmed' | 'finalized'): string {
  switch (c) {
    case "processed":
      return '⚒'
    case "confirmed":
      return '👌'
    case "finalized":
      return '🏁'
    default:
      return '❓'
  }
}

function calcPercent(num: number): string {
  return (num*100).toFixed(2);
}

const Commitment = (props: ComProps) => {
	const [isChanging, setIsChanging] = useState(false);
	useEffect(() => {
		setIsChanging(true)
		const q = setTimeout(() => setIsChanging(false), 300)
		return () => {
			setIsChanging(false)
			clearTimeout(q)
		}
	}, [props.commitment]);
	const classes = 'px-2 ' + (isChanging ? ' bg-amber-200' : '')
  return <span className={classes}>{getIcon(props.commitment)} {props.commitment}</span>
}


export const Home = (): FunctionComponent => {
  const {
          connect,
          disconnect,
          slots,
        } = useWebSocketStore();

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (<div className="w-screen h-screen flex flex-col justify-start items-start m-auto">
		<div className="grid grid-cols-3 gap-1">
			<div className="border-2 border-amber-100 px-2">slot</div>
			<div className="border-2 border-amber-100 px-2">Commitment</div>
			<div className="border-2 border-amber-100 px-2">compute units</div>
			{Object.values(slots).reverse().map(elt => <Fragment key={elt.slot}>
				<div className="border-2 border-amber-100 px-2">{elt.slot}</div>
				<div className="border-2 border-amber-200 px-2"><Commitment commitment={elt.commitment}/></div>
				<div className="border-2 border-amber-200 px-2">{elt.totalUnitsConsumed} ({calcPercent(elt.totalUnitsConsumed / 48_000_000)}%)</div>
			</Fragment>)}
		</div>
	</div>);
};
