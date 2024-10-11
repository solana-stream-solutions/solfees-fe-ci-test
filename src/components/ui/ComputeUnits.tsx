import {Text} from "@consta/uikit/Text";

interface Props {
  items: {
    amount: string,
    percent: string;
  }[]
}

export const ComputeUnits = ({items}: Props) => {
  return <div className="px-3 min-w-0">
    {items.map(({
                  amount,
                  percent,
                }) => <div key={amount}
      className="flex justify-end text-right gap-1 shrink-0">
      <Text font="mono">{amount}</Text><Text font="mono">({percent}%)</Text></div>)}
  </div>
}
