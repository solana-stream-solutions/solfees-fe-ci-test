import type {FunctionComponent} from "../common/types";
import {CSSProperties, ReactNode, useCallback, useDeferredValue, useMemo, useState} from "react";
import {SlotContent, useWebSocketStore} from "../store/websocketStore.ts";
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
import {IconFeed} from "../components/ui/IconFeed.tsx";
import {ModalFilter} from "../components/ui/ModalFilter.tsx";
import {percentFromStore} from "../common/utils.ts";
import {ModalFee} from "../components/ui/ModalFee.tsx";
import {Footer} from "../components/layout/Footer.tsx";
import {PlotLayer} from "../components/layout/PlotLayer.tsx";


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

