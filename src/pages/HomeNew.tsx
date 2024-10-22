import type {FunctionComponent} from "../common/types";
import {CSSProperties, ReactNode, useCallback, useDeferredValue, useEffect, useMemo, useState} from "react";
import {CommitmentStatus, SlotContent, useWebSocketStore} from "../store/websocketStore.ts";
import {Table, TableColumn} from '@consta/table/Table';
import {IconInfoCircle} from '@consta/icons/IconInfoCircle';
import {IconFunnel} from '@consta/icons/IconFunnel';
import {IconEdit} from '@consta/icons/IconEdit';
import {withTooltip} from '@consta/uikit/withTooltip';
import {Button} from "@consta/uikit/Button";
import {TooltipProps} from "@consta/uikit/__internal__/src/hocs/withTooltip/withTooltip";
import {useFlag} from "@consta/uikit/useFlag";
import {Validator} from "../components/ui/Validator.tsx";
import {Slots} from "../components/ui/Slots.tsx";
import {Transactions} from "../components/ui/Transactions.tsx";
import {ComputeUnits} from "../components/ui/ComputeUnits.tsx";
import {Epoch} from "../components/ui/Epoch.tsx";
import {HeaderDataCell} from "@consta/table/HeaderDataCell";
import {SimpleCell} from "../components/ui/SimpleCell.tsx";
import {useNavigate} from "@tanstack/react-router";
import {
  Area, Bar, CartesianGrid, ComposedChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import {IconFeed} from "../components/ui/IconFeed.tsx";
import {ModalFilter} from "../components/ui/ModalFilter.tsx";
import {percentFromStore} from "../common/utils.ts";
import {ModalFee} from "../components/ui/ModalFee.tsx";
import {CurveType} from "recharts/types/shape/Curve";
import {ContentType} from "recharts/types/component/Tooltip";
import {Footer} from "../components/layout/Footer.tsx";
import {SwitchGroup} from "@consta/uikit/SwitchGroup";
import {Switch} from "@consta/uikit/Switch";


const ButtonWithTooltip = withTooltip({content: 'Тултип сверху'})(Button);

const InfoButton = (props: TooltipProps): ReactNode => {
  return <ButtonWithTooltip as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconInfoCircle}
                            tooltipProps={props}/>
}

function buildTransactions(slots: SlotContent[], withFiltered = false) {
  const zero = slots.map(elt => elt.totalTransactionsFiltered)
  const maxZero = `${Math.max(...zero)}`.length
  const first = slots.map(elt => elt.totalTransactions - elt.totalTransactionsVote)
  const maxFirst = `${Math.max(...first)}`.length
  const second = slots.map(elt => elt.totalTransactions)
  const maxSecond = `${Math.max(...second)}`.length
  const aligned = slots.map((_, idx) => {
    const colOne = `${first[idx]}`.padStart(maxFirst, ' ');
    const colSecond = `${second[idx]}`.padStart(maxSecond, ' ');
    let colFiltered = ''
    if (withFiltered) {
      colFiltered = `${zero[idx]}`.padStart(maxZero, ' ');
      colFiltered += ' / '
    }
    return colFiltered + colOne + ' / ' + colSecond
  })
  return aligned
}

type TableProps = {
  onEditFee: (idx: number) => void
  onEditKeys: () => void
}


const CustomTable = ({
                       onEditFee,
                       onEditKeys,
                     }: TableProps) => {
  const slots2 = useWebSocketStore(state => state.slots2);
  const percents = useWebSocketStore(state => state.percents)
  const readonlyKeys = useWebSocketStore(state => state.readonlyKeys)
  const readwriteKeys = useWebSocketStore(state => state.readwriteKeys)

  const memoFee0 = useCallback(() => onEditFee(0), [onEditFee])
  const memoFee1 = useCallback(() => onEditFee(1), [onEditFee])
  const memoFee2 = useCallback(() => onEditFee(2), [onEditFee])

  const isTransactionsApplied = useMemo(() => {
    return !!readwriteKeys.length || !!readonlyKeys.length
  }, [readwriteKeys.length, readonlyKeys.length])


  const rowsFromSocket2 = useMemo(() => {
    const unsorted = slots2 as Record<string, SlotContent[]>
    const result = Object.entries(unsorted).sort((a, b) => Number(a[0]) - Number(b[0])).map(([id, slots]) => {
      const leader = slots[0]?.leader || 'UNKNOWN'
      return {
        id,
        leader,
        slots: slots.map(elt => ({
          commitment: elt.commitment,
          slot: elt.slot,
        })),
        transactions: buildTransactions(slots, isTransactionsApplied),
        computeUnits: slots.map(elt => ({
          amount: elt.totalUnitsConsumed.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          percent: (elt.totalUnitsConsumed / 48_000_000 * 100).toFixed(2),
        })),
        earnedSol: slots.map(elt => {
          const value = elt.totalFee / 1e9;
          return value > 1 ? value.toLocaleString('unknown', {
            maximumFractionDigits: 9,
            minimumFractionDigits: 9,
          }).replace(/\s/g, '') : value.toFixed(9)
        }),
        averageFee: slots.map(elt => elt.feeAverage.toLocaleString('en-US', {maximumFractionDigits: 2})),
        fee0: slots.map(elt => (elt.feeLevels[0] || 0).toLocaleString('en-US', {maximumFractionDigits: 2})),
        fee1: slots.map(elt => (elt.feeLevels[1] || 0).toLocaleString('en-US', {maximumFractionDigits: 2})),
        fee2: slots.map(elt => (elt.feeLevels[2] || 0).toLocaleString('en-US', {maximumFractionDigits: 2})),
      }
    })
    return [...result].reverse();
  }, [slots2, isTransactionsApplied])

  const columns: TableColumn<typeof rowsFromSocket2[number]>[] = useMemo(() => {
    return [
      {
        title: 'Validator',
        accessor: 'leader',
        minWidth: 150,
        renderCell: ({row}) => <Validator leader={row.leader}/>,
      }, {
        width: 'auto',
        minWidth: 170,
        title: 'Slots',
        accessor: 'slots',
        renderCell: ({row}) => <Slots items={row.slots}/>,
      }, {
        title: 'Transactions',
        accessor: 'transactions',
        width: 'auto',
        minWidth: 160,
        renderHeaderCell: ({title}) => <HeaderDataCell
          controlRight={[
            <Button style={{
              '--button-color': isTransactionsApplied ? 'red' : undefined,
              '--button-color-hover': isTransactionsApplied ? 'darkred' : undefined,
            } as unknown as CSSProperties} view="clear" size="s" onlyIcon iconRight={IconFunnel} onClick={onEditKeys}/>,
          ]}
        >
          {title}
        </HeaderDataCell>,
        renderCell: ({row}) => <Transactions items={row.transactions}/>,
      }, {
        title: 'Compute Units',
        width: 'auto',
        minWidth: 216,
        accessor: 'computeUnits',
        renderHeaderCell: ({title}) => <HeaderDataCell
          controlRight={[
            <InfoButton content={title as string} direction={'downCenter'}/>,
          ]}
        >
          {title}
        </HeaderDataCell>,
        renderCell: ({row}) => <ComputeUnits items={row.computeUnits}/>,
      }, {
        width: 'auto',
        title: 'Earned SOL',
        minWidth: 160,
        accessor: 'earnedSol',
        renderHeaderCell: ({title}) => <HeaderDataCell
          controlRight={[
            <InfoButton content={title as string} direction={'downCenter'}/>,
          ]}
        >
          {title}
        </HeaderDataCell>,
        renderCell: ({row}) => <SimpleCell list={row.earnedSol}/>,

      }, {
        title: 'Average Fee',
        minWidth: 160,
        accessor: 'averageFee',
        width: 'auto',

        renderHeaderCell: ({title}) => <HeaderDataCell
          controlRight={[
            <InfoButton content={title as string} direction={'downCenter'}/>,
          ]}
        >
          {title}
        </HeaderDataCell>,
        renderCell: ({row}) => <SimpleCell list={row.averageFee}/>,

      }, {
        width: 'auto',
        minWidth: 160,
        title: 'Fee p' + percentFromStore(percents[0]),
        accessor: 'fee0',
        renderHeaderCell: ({title}) => <HeaderDataCell
          controlRight={[
            <Button as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconEdit}
                    onClick={memoFee0}/>,
          ]}
        >
          {title}
        </HeaderDataCell>,
        renderCell: ({row}) => <SimpleCell list={row.fee0}/>,

      }, {
        width: 'auto',
        minWidth: 160,

        title: 'Fee p' + percentFromStore(percents[1]),
        accessor: 'fee1',
        renderHeaderCell: ({title}) => <HeaderDataCell
          controlRight={[
            <Button as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconEdit}
                    onClick={memoFee1}/>,
          ]}
        >
          {title}
        </HeaderDataCell>,
        renderCell: ({row}) => <SimpleCell list={row.fee1}/>,

      }, {
        width: 'auto',
        minWidth: 160,

        title: 'Fee p' + percentFromStore(percents[2]),
        accessor: 'fee2',
        renderHeaderCell: ({title}) => <HeaderDataCell
          controlRight={[
            <Button as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconEdit}
                    onClick={memoFee2}/>,
          ]}
        >
          {title}
        </HeaderDataCell>,
        renderCell: ({row}) => <SimpleCell list={row.fee2}/>,

      },
    ]
  }, [isTransactionsApplied, onEditKeys, percents, memoFee0, memoFee1, memoFee2]);

  const deferredValue = useDeferredValue(rowsFromSocket2)

  // Этим проверял, что построение без UI KIT быстрее
  const isSimple = false;
  if (isSimple) return <>
    <div className="w-full overflow-x-auto">
      {rowsFromSocket2.map((row, _idx) => {
        const key = `${row.leader}-${((row.slots[0]?.slot || 0) / 4) | 0}`
        return <div className="border flex flex-row gap-1" key={key}>
          <div className="bg-red-100">{row.leader}</div>
          <div>
            {row.slots.map((slot) => (<div className="bg-green-100" key={slot.slot}>
              {slot.commitment}-{slot.slot}
            </div>))}
          </div>
          <div>
            {row.fee0.map((elt, idx) => (<div className="bg-blue-100" key={idx}>
              {elt}
            </div>))}
          </div>
          <div>
            {row.fee1.map((elt, idx) => (<div className="bg-red-100" key={idx}>
              {elt}
            </div>))}
          </div>
          <div>
            {row.averageFee.map((elt, idx) => (<div className="bg-green-100" key={idx}>
              {elt}
            </div>))}
          </div>
          <div>
            {row.earnedSol.map((elt, idx) => (<div className="bg-blue-100" key={idx}>
              {elt}
            </div>))}
          </div>
          <div>
            {row.computeUnits.map((elt, idx) => (<div className="bg-red-100" key={idx}>
              {elt.amount}-{elt.percent}
            </div>))}
          </div>
        </div>
      })}
    </div>
  </>


  if (!rowsFromSocket2.length) return <span
    className="w-full h-full text-center text-xl font-bold">Loading...</span>

  return <div className="w-full h-full overflow-x-auto">
    <Table className="overflow-scroll" columns={columns} rows={deferredValue}
           style={{maxHeight: '100%'}}
           virtualScroll={true}
           resizable={undefined}/>
  </div>
}


type Item = {
  key: number;
  value: string;
};

const items: Item[] = [
  {
    key: 0,
    value: 'fee0',
  }, {
    key: 1,
    value: 'fee1',
  }, {
    key: 2,
    value: 'fee2',
  },
];
const PlotLayer = () => {
  const [isAreaOne, areaControlsOne] = useFlag(true)
  const [isAreaTwo, areaControlsTwo] = useFlag(true)
  const [value, setValue] = useState<Item[] | null>(null);
  const percents = useWebSocketStore(state => state.percents)
  const getItemLabel = (arg: Item): string => 'p' + ((percents[arg.key] || 0) / 100).toLocaleString('en-US', {maximumFractionDigits: 2})

  return <>
    <div className="flex flex-nowrap gap-4 w-full">
      <div className="w-full">
        <Switch label="Bars plot" checked={isAreaOne} onChange={areaControlsOne.toggle}/>
        {!isAreaOne ? <ExampleAreaOne/> : <ExampleAreaOneBar/>}
      </div>
      <div className="w-full">
        <Switch label="Bars plot" checked={isAreaTwo} onChange={areaControlsTwo.toggle}/>
        {!isAreaTwo ? <ExampleAreaTwo/> : <ExampleAreaTwoBar/>}
      </div>
      <div className="w-full">
        <SwitchGroup
          value={value}
          items={items}
          getItemLabel={getItemLabel}
          onChange={(arg) => setValue(arg as (Item[] | null))}
          direction="row"
          name="FeesControls"/>
        <ExampleAreaThree items={(value || []).map(elt => elt.value)}/>
      </div>
    </div>
  </>
}


export const HomeNew = (): FunctionComponent => {
  const [filterModalShown, filterModalControls] = useFlag(false)
  const [editedFeeIdx, setEditedFeeIdx] = useState(-1)

  const navigate = useNavigate()

  return (<>
    <button className="absolute top-2 left-2 rounded bg-amber-300" onClick={() => navigate({to: '/homeOld'})}>click to
      view Table from @consta\uikit (old)
    </button>
    <div className="px-20 py-5 bg-white w-full flex-col justify-start items-start gap-8 inline-flex h-[100vh] relative">
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="justify-start items-center gap-2 flex">
          <IconFeed className="w-5 h-5 relative"/>
          <div className="text-center text-[#002033] text-2xl font-semibold font-['Inter'] leading-[31.20px]">Solfees
          </div>
          <div className="text-center text-[#002033]/60 text-sm font-normal font-['Inter'] leading-[21px]">Solana Fees
            Tracker
          </div>
        </div>
        <Epoch/>
      </div>
      <PlotLayer/>
      <CustomTable onEditFee={setEditedFeeIdx} onEditKeys={filterModalControls.on}/>
      <ModalFee editedFeeIdx={editedFeeIdx} isVisible={editedFeeIdx >= 0} onClose={() => setEditedFeeIdx(-1)}/>
      <ModalFilter isVisible={filterModalShown} onClose={filterModalControls.off}/>
      <Footer/>
    </div>
  </>);
}


function nFormatter(num: number, digits = 0): string {
  const lookup = [
    {
      value: 1,
      symbol: "",
    }, {
      value: 1e3,
      symbol: "k",
    }, {
      value: 1e6,
      symbol: "M",
    }, {
      value: 1e9,
      symbol: "G",
    }, {
      value: 1e12,
      symbol: "T",
    }, {
      value: 1e15,
      symbol: "P",
    }, {
      value: 1e18,
      symbol: "E",
    },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(item => num >= item.value);
  return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
}

function tickFormatter(value: number, _index: number): string {
  return nFormatter(value)
}

function tickFormatter2(value: number, _index: number): string {
  const newValue = value / 1e9;
  return newValue.toFixed(2)
}


const CustomTooltip: ContentType<any, any> = ({
                                                active,
                                                payload,
                                              }) => {
  if (active && payload && payload.length) {
    if (payload[0]) {
      const elt = payload[0].payload;
      return <div className="recharts-default-tooltip">
        <p className="recharts-tooltip-label">Slot: {elt.x.toLocaleString('en-US')} ({elt.commitment})</p>
        <ul className="recharts-tooltip-item-list">
          <li className="recharts-tooltip-item">
            <span className="recharts-tooltip-item-name">Tracked Items</span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">{elt.y.toLocaleString('en-US')}</span>
          </li>
          <li className="recharts-tooltip-item">
            <span className="recharts-tooltip-item-name">DEBUG processed</span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">{elt.value.processed}</span>
          </li>
          <li className="recharts-tooltip-item">
            <span className="recharts-tooltip-item-name">DEBUG confirmed</span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">{elt.value.confirmed}</span>
          </li>
          <li className="recharts-tooltip-item">
            <span className="recharts-tooltip-item-name">DEBUG finalized</span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">{elt.value.finalized}</span>
          </li>
        </ul>
      </div>
    }
  }

  return null;
};
const CustomTooltip2: ContentType<any, any> = ({
                                                 active,
                                                 payload,
                                               }) => {
  if (active && payload && payload.length) {
    if (payload[0]) {
      const elt = payload[0].payload;
      const value = elt.y / 1e9;
      const valueInTooltip = value > 1 ? value.toLocaleString('unknown', {
        maximumFractionDigits: 9,
        minimumFractionDigits: 9,
      }).replace(/\s/g, '') : value.toFixed(9)
      return <div className="recharts-default-tooltip">
        <p className="recharts-tooltip-label">Slot: {elt.x.toLocaleString('en-US')} ({elt.commitment})</p>
        <ul className="recharts-tooltip-item-list">
          <li className="recharts-tooltip-item">
            <span className="recharts-tooltip-item-name">Earned</span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">{valueInTooltip}</span>
          </li>
          <li className="recharts-tooltip-item">
            <span className="recharts-tooltip-item-name">DEBUG processed</span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">{elt.value.processed}</span>
          </li>
          <li className="recharts-tooltip-item">
            <span className="recharts-tooltip-item-name">DEBUG confirmed</span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">{elt.value.confirmed}</span>
          </li>
          <li className="recharts-tooltip-item">
            <span className="recharts-tooltip-item-name">DEBUG finalized</span>
            <span className="recharts-tooltip-item-separator"> : </span>
            <span className="recharts-tooltip-item-value">{elt.value.finalized}</span>
          </li>
        </ul>
      </div>
    }
  }

  return null;
};

type PlotInfo = {
  x: number;
  commitment: CommitmentStatus;
  y: number;
  value: Record<CommitmentStatus, null | number>
}
type FeesInfo = {
  x: number;
  commitment: CommitmentStatus;
  y: number;
  fee0: number | null;
  fee1: number | null;
  fee2: number | null;
}
export const ExampleAreaOne = () => {

  const slots2 = useWebSocketStore(state => state.slots2);

  const [type, _setType] = useState<CurveType>('monotone');


  const data = useMemo(() => {
    const entries = Object.entries(slots2);
    const packedData = entries.reduce<PlotInfo[]>((acc, [_groupIdx, slots]) => {
      const chunk = slots.map(elt => {
        const obj = {
          x: elt.slot,
          y: elt.totalUnitsConsumed,
          commitment: elt.commitment,
          value: {
            confirmed: null,
            finalized: null,
            processed: null,
          },
        } satisfies PlotInfo
        // Я хз чего он ругается, но заглушим
        obj.value[elt.commitment] = obj.y as unknown as null;
        return obj;
      })
      const sorted = chunk.sort((a, b) => a.x - b.x)
      acc.push(...sorted)
      return acc
    }, [])
    // Второй раз пробегаемся, закрываем дырки, если статусы разные
    const filledGapsData = packedData.map((elt, idx, arr) => {
      const prevPrev = arr[idx - 2];
      const prev = arr[idx - 1]
      if (prev) {
        if (prev.commitment !== elt.commitment) {
          prev.value[elt.commitment] = prev.y
        }
        // Corner Case ситуации A A A B A A
        if (prevPrev) {
          if (prev.commitment !== elt.commitment && prevPrev.commitment === elt.commitment) {
            elt.value[prev.commitment] = elt.y;
            prev.value[prevPrev.commitment] = null;
          }
        }
      }
      return elt
    })
    return filledGapsData
  }, [slots2])
  return <div style={{
    width: '100%',
  }}>
    <ResponsiveContainer width="100%" height={200}>
      <ComposedChart data={data} margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
        <YAxis scale="auto" tickFormatter={tickFormatter}/>
        <XAxis label="Compute Units" orientation={'top'} tick={false} axisLine={false}/>
        <ReferenceLine y="48000000" stroke="red"/>
        <Tooltip content={<CustomTooltip/>}/>
        <Area type={type} dataKey="value.processed" stroke="gray" fill="gray" opacity={1}
              isAnimationActive={false}/>
        <Area type={type} dataKey="value.confirmed" stroke="yellow" fill="yellow" opacity={1}
              isAnimationActive={false}/>
        <Area type={type} dataKey="value.finalized" stroke="green" fill="green" opacity={1}
              isAnimationActive={false}/>
      </ComposedChart>
    </ResponsiveContainer>
  </div>;
}
export const ExampleAreaOneBar = () => {

  const slots2 = useWebSocketStore(state => state.slots2);

  const [_type, _setType] = useState<CurveType>('monotone');


  const data = useMemo(() => {
    const entries = Object.entries(slots2);
    const packedData = entries.reduce<PlotInfo[]>((acc, [_groupIdx, slots]) => {
      const chunk = slots.map(elt => {
        const obj = {
          x: elt.slot,
          y: elt.totalUnitsConsumed,
          commitment: elt.commitment,
          value: {
            confirmed: null,
            finalized: null,
            processed: null,
          },
        } satisfies PlotInfo
        // Я хз чего он ругается, но заглушим
        obj.value[elt.commitment] = obj.y as unknown as null;
        return obj;
      })
      const sorted = chunk.sort((a, b) => a.x - b.x)
      acc.push(...sorted)
      return acc
    }, [])
    return packedData
  }, [slots2])
  return <div style={{
    width: '100%',
  }}>
    <ResponsiveContainer width="100%" height={200}>
      <ComposedChart data={data} margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
        <YAxis scale="auto" tickFormatter={tickFormatter}/>
        <XAxis label="Compute Units" orientation={'top'} tick={false} axisLine={false}/>
        <ReferenceLine y="48000000" stroke="red"/>
        <Tooltip content={<CustomTooltip/>}/>
        <Bar dataKey="value.processed" stroke="gray" fill="gray" opacity={1}
             isAnimationActive={false}/>
        <Bar dataKey="value.confirmed" stroke="yellow" fill="yellow" opacity={1}
             isAnimationActive={false}/>
        <Bar dataKey="value.finalized" stroke="green" fill="green" opacity={1}
             isAnimationActive={false}/>
      </ComposedChart>
    </ResponsiveContainer>
  </div>;
}


export const ExampleAreaTwo = () => {

  const slots2 = useWebSocketStore(state => state.slots2);

  const [type, _setType] = useState<CurveType>('monotone');


  const data = useMemo(() => {
    const entries = Object.entries(slots2);
    const packedData = entries.reduce<PlotInfo[]>((acc, [_groupIdx, slots]) => {
      const chunk = slots.map(elt => {
        const obj = {
          x: elt.slot,
          y: elt.totalFee,
          commitment: elt.commitment,
          value: {
            confirmed: null,
            finalized: null,
            processed: null,
          },
        } satisfies PlotInfo
        // Я хз чего он ругается, но заглушим
        obj.value[elt.commitment] = obj.y as unknown as null;
        return obj;
      })
      const sorted = chunk.sort((a, b) => a.x - b.x)
      acc.push(...sorted)
      return acc
    }, [])
    // Второй раз пробегаемся, закрываем дырки, если статусы разные
    const filledGapsData = packedData.map((elt, idx, arr) => {
      const prevPrev = arr[idx - 2];
      const prev = arr[idx - 1]
      if (prev) {
        if (prev.commitment !== elt.commitment) {
          prev.value[elt.commitment] = prev.y
        }
        // Corner Case ситуации A A A B A A
        if (prevPrev) {
          if (prev.commitment !== elt.commitment && prevPrev.commitment === elt.commitment) {
            elt.value[prev.commitment] = elt.y;
            prev.value[prevPrev.commitment] = null;
          }
        }
      }
      return elt
    })
    return filledGapsData
  }, [slots2])
  return <div style={{
    width: '100%',
  }}>
    <ResponsiveContainer width="100%" height={200}>
      <ComposedChart data={data} margin={{
        top: 10,
        right: 10,
        left: 40,
        bottom: 0,
      }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
        <YAxis scale="auto" tickFormatter={tickFormatter2}/>
        <XAxis label="Earned SOL" orientation={'top'} tick={false} axisLine={false}/>
        <Tooltip content={<CustomTooltip2/>}/>
        <Area type={type} dataKey="value.processed" stroke="gray" fill="gray" opacity={1}
              isAnimationActive={false}/>
        <Area type={type} dataKey="value.confirmed" stroke="yellow" fill="yellow" opacity={1}
              isAnimationActive={false}/>
        <Area type={type} dataKey="value.finalized" stroke="green" fill="green" opacity={1}
              isAnimationActive={false}/>
      </ComposedChart>
    </ResponsiveContainer>
  </div>;
}
export const ExampleAreaTwoBar = () => {

  const slots2 = useWebSocketStore(state => state.slots2);

  const [type, _setType] = useState<CurveType>('monotone');


  const data = useMemo(() => {
    const entries = Object.entries(slots2);
    const packedData = entries.reduce<PlotInfo[]>((acc, [_groupIdx, slots]) => {
      const chunk = slots.map(elt => {
        const obj = {
          x: elt.slot,
          y: elt.totalFee,
          commitment: elt.commitment,
          value: {
            confirmed: null,
            finalized: null,
            processed: null,
          },
        } satisfies PlotInfo
        // Я хз чего он ругается, но заглушим
        obj.value[elt.commitment] = obj.y as unknown as null;
        return obj;
      })
      const sorted = chunk.sort((a, b) => a.x - b.x)
      acc.push(...sorted)
      return acc
    }, [])
    // Второй раз пробегаемся, закрываем дырки, если статусы разные
    return packedData
  }, [slots2])
  return <div style={{
    width: '100%',
  }}>
    <ResponsiveContainer width="100%" height={200}>
      <ComposedChart data={data} margin={{
        top: 10,
        right: 10,
        left: 40,
        bottom: 0,
      }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
        <YAxis scale="auto" tickFormatter={tickFormatter2}/>
        <XAxis label="Earned SOL" orientation={'top'} tick={false} axisLine={false}/>
        <Tooltip content={<CustomTooltip2/>}/>
        <Bar dataKey="value.processed" stroke="gray" fill="gray" opacity={1}
             isAnimationActive={false}/>
        <Bar dataKey="value.confirmed" stroke="yellow" fill="yellow" opacity={1}
             isAnimationActive={false}/>
        <Bar dataKey="value.finalized" stroke="green" fill="green" opacity={1}
             isAnimationActive={false}/>
      </ComposedChart>
    </ResponsiveContainer>
  </div>;
}

// Черновики для тестов как тултипы в графиках будут себя вести
function simpleFormatter(value: string, name: string): [string, string] {
  let formattedValue = value;
  let formattedName = name;

  const newValue = (+value).toLocaleString('en-US', {maximumFractionDigits: 2})
  if (!Number.isNaN(+value)) formattedValue = newValue

  if (name === 'y') {
    formattedName = `Average fee`;
  }

  return [formattedValue, formattedName];
}

interface PropsAreaThree {
  items: string[]
}

function getColor(arg: string): string {
  const areaColors: Record<string, string> = {
    fee0: 'red',
    fee1: 'green',
    fee2: 'blue',
  }
  return areaColors[arg] || 'gray'
}

export const ExampleAreaThree = ({items}: PropsAreaThree) => {

  const slots2 = useWebSocketStore(state => state.slots2);

  const [type, _setType] = useState<CurveType>('monotone');


  const data = useMemo(() => {
    const entries = Object.entries(slots2);
    const packedData = entries.reduce<FeesInfo[]>((acc, [_groupIdx, slots]) => {
      const chunk = slots.map(elt => {
        const obj = {
          x: elt.slot,
          y: elt.feeAverage,
          commitment: elt.commitment,
          fee0: elt.feeLevels[0] || null,
          fee1: elt.feeLevels[1] || null,
          fee2: elt.feeLevels[2] || null,
        } satisfies FeesInfo
        return obj;
      })
      const sorted = chunk.sort((a, b) => a.x - b.x)
      acc.push(...sorted)
      return acc
    }, [])
    return packedData
  }, [slots2])
  return <div style={{
    width: '100%',
  }}>
    <ResponsiveContainer width="100%" height={200}>
      <ComposedChart data={data} margin={{
        top: 10,
        right: 10,
        left: 40,
        bottom: 0,
      }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
        <YAxis scale="sqrt"/>
        <XAxis label="Fees" orientation={'top'} tick={false} axisLine={false}/>
        <Tooltip labelFormatter={(label, payload) => {
          if (payload[0]) {
            const slot = payload[0].payload.x
            return 'Slot: ' + slot.toLocaleString('en-US')
          }
          return label;
        }} formatter={simpleFormatter}/>
        <Area type={type} dataKey="y" stroke="gray" fill="gray" opacity={0.7}
              dot={false}
              isAnimationActive={false}/>
        {items.map(elt => <Area key={elt} type={type} dataKey={elt} stroke={getColor(elt)} fill={getColor(elt)} opacity={0.99}
                                isAnimationActive={false}/>)}
      </ComposedChart>
    </ResponsiveContainer>
  </div>;
}
