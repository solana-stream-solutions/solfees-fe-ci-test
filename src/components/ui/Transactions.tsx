import {Text} from "@consta/uikit/Text";
import {DataCell} from "@consta/table/DataCell";

interface Props {
  items: string[]
}
export const Transactions = ({items}: Props) => {
  return    <div className="px-3 text-right">
      {items.map(elt => <Text key={elt} font="mono"
                              className="whitespace-pre">{elt}</Text>)}
    </div>

}