import type {FunctionComponent} from "../common/types";
import {CSSProperties, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {SlotContent, useWebSocketStore} from "../store/websocketStore.ts";
import {Table, TableColumn} from '@consta/table/Table';
import {IconInfoCircle} from '@consta/icons/IconInfoCircle';
import {IconFunnel} from '@consta/icons/IconFunnel';
import {IconEdit} from '@consta/icons/IconEdit';
import {IconAdd} from '@consta/icons/IconAdd';
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
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {IconFeed} from "../components/ui/IconFeed.tsx";
import {ModalFilter} from "../components/ui/ModalFilter.tsx";
import {percentFromStore} from "../common/utils.ts";
import {ModalFee} from "../components/ui/ModalFee.tsx";


const ButtonWithTooltip = withTooltip({content: 'Тултип сверху'})(Button);

const InfoButton = (props: TooltipProps): ReactNode => {
  return <ButtonWithTooltip as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconInfoCircle}
                            tooltipProps={props}/>
}


function buildTransactions(slots: SlotContent[]) {
  const first = slots.map(elt => elt.totalTransactions - elt.totalTransactionsVote)
  const maxFirst = `${Math.max(...first)}`.length
  const second = slots.map(elt => elt.totalTransactions)
  const maxSecond = `${Math.max(...second)}`.length
  const aligned = slots.map((_, idx) => {
    const colOne = `${first[idx]}`.padStart(maxFirst, ' ');
    const colSecond = `${second[idx]}`.padStart(maxSecond, ' ');
    return colOne + ' / ' + colSecond
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
  const slots = useWebSocketStore(state => state.slots);
  const slots2 = useWebSocketStore(state => state.slots2);
  const disconnect = useWebSocketStore(state => state.disconnect)
  const connect = useWebSocketStore(state => state.connect)
  const percents = useWebSocketStore(state => state.percents)
  const readonlyKeys = useWebSocketStore(state => state.readonlyKeys)
  const readwriteKeys = useWebSocketStore(state => state.readwriteKeys)

  const memoFee0 = useCallback(() => onEditFee(0), [onEditFee])
  const memoFee1 = useCallback(() => onEditFee(1), [onEditFee])

  const rowsFromSocket = useMemo(() => {
    const groupByLeader: Record<string, {
      slots: SlotContent[],
      leader: string
    }> = {}
    let slice: SlotContent[] = [];
    let currentLeader = slots[0]?.leader || ''
    for (let i = 0; i < slots.length; i++) {
      if (currentLeader === slots[i]?.leader && slice.length < 4) {
        slice.push(slots[i] as SlotContent)
      } else {
        groupByLeader[i] = {
          slots: slice.reverse(),
          leader: currentLeader,
        }
        slice = [slots[i] as SlotContent]
        currentLeader = slots[i]?.leader || ''
      }
    }
    // Кладем хвостик, который остался не прибитый
    // Если будут фильтры, то возможно не нужен трешхолд такой
    if (slice.length > 0) groupByLeader['last'] = {
      slots: slice.reverse(),
      leader: currentLeader,
    };

    return Object.entries(groupByLeader).map(([
                                                _, {
        slots,
        leader,
      },
                                              ]: [
      string, {
        slots: SlotContent[],
        leader: string
      }
    ]) => {
      // let slots = rawSlots.length === 4 ? rawSlots : append(rawSlots)
      return {
        id: `${leader}-${slots[0]?.slot || 'empty'}`,
        leader,
        slots: slots.map(elt => ({
          commitment: elt.commitment,
          slot: elt.slot,
        })),
        transactions: buildTransactions(slots),
        computeUnits: slots.map(elt => ({
          amount: elt.totalUnitsConsumed.toLocaleString('en-US'),
          percent: (elt.totalUnitsConsumed / 48_000_000 * 100).toFixed(2),
        })),
        earnedSol: slots.map(elt => elt.totalFee),
        averageFee: slots.map(elt => elt.feeAverage.toFixed(2)),
        fee0: slots.map(elt => elt.feeLevels[0] || 0),
        fee1: slots.map(elt => elt.feeLevels[1] || 0),
        add: [],
      }
    })
  }, [slots])
  const rowsFromSocket2 = useMemo(() => {
    const unsorted = slots2 as Record<string, SlotContent[]>
    return Object.entries(unsorted).sort((a, b) => Number(a[0]) - Number(b[0])).map(([id, slots]) => {
      const leader = slots[0]?.leader || 'UNKNOWN'
      return {
        id,
        leader,
        slots: slots.map(elt => ({
          commitment: elt.commitment,
          slot: elt.slot,
        })),
        transactions: buildTransactions(slots),
        computeUnits: slots.map(elt => ({
          amount: elt.totalUnitsConsumed.toLocaleString('en-US'),
          percent: (elt.totalUnitsConsumed / 48_000_000 * 100).toFixed(2),
        })),
        earnedSol: slots.map(elt => elt.totalFee),
        averageFee: slots.map(elt => elt.feeAverage.toFixed(2)),
        fee0: slots.map(elt => elt.feeLevels[0] || 0),
        fee1: slots.map(elt => elt.feeLevels[1] || 0),
        add: [],
      }
    })
  }, [slots2])

  const isTransactionsApplied = useMemo(() => {
    return !!readwriteKeys.length || !!readonlyKeys.length
  }, [readwriteKeys.length, readonlyKeys.length])
  const columns: TableColumn<typeof rowsFromSocket[number]>[] = useMemo(() => {
    return [
      {
        title: 'Validator',
        accessor: 'leader',
        minWidth: 490,
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
        minWidth: 190,
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
        title: 'Add',
        accessor: 'add',
        renderHeaderCell: ({title}) => <HeaderDataCell
          controlRight={[
            <Button as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconAdd}/>,
          ]}
        >
          {title}
        </HeaderDataCell>,
      },
    ]
  }, [isTransactionsApplied, onEditKeys, percents, memoFee0, memoFee1]);

  useEffect(() => {
    console.log('effect with connect!');
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  const isSimple = false;
  if (isSimple) return <>
    <div className="w-full overflow-x-auto">
      {rowsFromSocket2.map((row) => {
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


  if (!slots.length) return <span
    className="w-full text-center text-xl font-bold">Loading...</span>

  return <div className="w-full overflow-x-auto">
    <Table className="overflow-scroll" columns={columns} rows={[...rowsFromSocket2].reverse()}
           style={{maxHeight: 400}}
           virtualScroll={true}
           resizable={undefined}/>
  </div>
}


export const HomeNew = (): FunctionComponent => {
  const [filterModalShown, filterModalControls] = useFlag(false)
  const [editedFeeIdx, setEditedFeeIdx] = useState(-1)

  const navigate = useNavigate()

  return (<>
    <button className="absolute top-2 left-2 rounded bg-amber-300" onClick={() => navigate({to: '/homeOld'})}>click to view Table from @consta\uikit (old)
    </button>
    <div className="px-20 py-5 bg-white w-full flex-col justify-start items-start gap-8 inline-flex">
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="justify-start items-center gap-2 flex">
          <IconFeed className="w-5 h-5 relative"></IconFeed>
          <div className="text-center text-[#002033] text-2xl font-semibold font-['Inter'] leading-[31.20px]">Solfees
          </div>
          <div className="text-center text-[#002033]/60 text-sm font-normal font-['Inter'] leading-[21px]">Solana Fees
            Tracker
          </div>
        </div>
        <Epoch/>
      </div>
      <div className="self-stretch justify-start items-center gap-5 inline-flex">
        <div className="w-[413px] h-[300px] relative">
          <div
            className="w-[413px] h-[300px] left-0 top-0 absolute flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch py-1 justify-start items-center inline-flex">
              <div className="grow shrink basis-0 h-4 justify-start items-start gap-3 flex">
                <div className="justify-start items-center gap-1 flex">
                  <div className="w-4 h-4 relative">
                    <div className="w-2 h-2 left-[4px] top-[4px] absolute bg-[#f38b01] rounded-full"></div>
                  </div>
                  <div className="text-[#002033] text-[10px] font-normal font-['Inter'] leading-[15px]">Compute units
                  </div>
                </div>
              </div>
            </div>
            <div className="h-64 relative">
              <div
                className="w-7 h-[206px] pl-px left-0 top-0 absolute flex-col justify-center items-center inline-flex">
                <div className="w-[27px] h-[206px] flex-col justify-between items-end inline-flex">
                  <div className="pl-3 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">4</div>
                    <div className="w-[5px] h-[0px] border border-[#004166]/20"></div>
                  </div>
                  <div className="pl-3 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">3</div>
                  </div>
                  <div className="pl-3 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">2</div>
                  </div>
                  <div className="pl-3.5 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">1</div>
                  </div>
                  <div className="pl-3 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">0</div>
                    <div className="w-[5px] h-[0px] border border-[#004166]/20"></div>
                  </div>
                </div>
              </div>
              <div className="w-[385px] h-[206px] left-[28px] top-0 absolute">
                <div className="w-[385px] h-[206px] left-0 top-0 absolute justify-center items-center inline-flex">
                  <div className="w-[385px] h-[206px] bg-white border border-[#004166]/20"></div>
                </div>
                <div
                  className="w-[385px] h-[206px] left-0 top-0 absolute flex-col justify-between items-center inline-flex"></div>
                <div
                  className="w-[385px] h-[206px] left-0 top-0 absolute justify-between items-center inline-flex"></div>
              </div>
              <div
                className="w-[385px] h-7 pb-px left-[28px] top-[206px] absolute justify-center items-center inline-flex">
                <div className="w-[385px] h-[27px] justify-between items-start inline-flex">
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div className="w-[5px] h-[0px] border border-[#004166]/20"></div>
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">0
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">1
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">2
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">3
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">4
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div className="w-[5px] h-[0px] border border-[#004166]/20"></div>
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">5
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[383px] h-[206px] left-[29px] top-[44px] absolute"></div>
        </div>
        <div className="w-[413px] h-[300px] relative">
          <div
            className="w-[413px] h-[300px] left-0 top-0 absolute flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch py-1 justify-start items-center inline-flex">
              <div className="grow shrink basis-0 h-4 justify-start items-start gap-3 flex">
                <div className="justify-start items-center gap-1 flex">
                  <div className="w-4 h-4 relative">
                    <div className="w-2 h-2 left-[4px] top-[4px] absolute bg-[#f2c94c] rounded-full"></div>
                  </div>
                  <div className="text-[#002033] text-[10px] font-normal font-['Inter'] leading-[15px]">Earned SOL</div>
                </div>
              </div>
            </div>
            <div className="h-64 relative">
              <div
                className="w-7 h-[206px] pl-px left-0 top-0 absolute flex-col justify-center items-center inline-flex">
                <div className="w-[27px] h-[206px] flex-col justify-between items-end inline-flex">
                  <div className="pl-3 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">4</div>
                    <div className="w-[5px] h-[0px] border border-[#004166]/20"></div>
                  </div>
                  <div className="pl-3 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">3</div>
                  </div>
                  <div className="pl-3 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">2</div>
                  </div>
                  <div className="pl-3.5 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">1</div>
                  </div>
                  <div className="pl-3 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">0</div>
                    <div className="w-[5px] h-[0px] border border-[#004166]/20"></div>
                  </div>
                </div>
              </div>
              <div className="w-[385px] h-[206px] left-[28px] top-0 absolute">
                <div className="w-[385px] h-[206px] left-0 top-0 absolute justify-center items-center inline-flex">
                  <div className="w-[385px] h-[206px] bg-white border border-[#004166]/20"></div>
                </div>
                <div
                  className="w-[385px] h-[206px] left-0 top-0 absolute flex-col justify-between items-center inline-flex"></div>
                <div
                  className="w-[385px] h-[206px] left-0 top-0 absolute justify-between items-center inline-flex"></div>
              </div>
              <div
                className="w-[385px] h-7 pb-px left-[28px] top-[206px] absolute justify-center items-center inline-flex">
                <div className="w-[385px] h-[27px] justify-between items-start inline-flex">
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div className="w-[5px] h-[0px] border border-[#004166]/20"></div>
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">0
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">1
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">2
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">3
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">4
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div className="w-[5px] h-[0px] border border-[#004166]/20"></div>
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">5
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[383px] h-[206px] left-[29px] top-[44px] absolute"></div>
        </div>
        <div className="w-[413px] h-[300px] relative">
          <div
            className="w-[413px] h-[300px] left-0 top-0 absolute flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch py-1 justify-start items-center inline-flex">
              <div className="grow shrink basis-0 h-4 justify-start items-center gap-3 flex">
                <div className="justify-start items-center gap-1 flex">
                  <div className="w-4 h-4 relative"></div>
                  <div className="text-[#002033] text-[10px] font-semibold font-['Inter'] leading-[15px]">Fees</div>
                </div>
                <div className="justify-start items-center gap-1 flex">
                  <div className="w-4 h-4 relative">
                    <div className="w-2 h-2 left-[4px] top-[4px] absolute bg-[#f38b00] rounded-full"></div>
                  </div>
                  <div className="text-[#002033] text-[10px] font-normal font-['Inter'] leading-[15px]">average</div>
                </div>
                <div className="justify-start items-center gap-1 flex">
                  <div className="w-4 h-4 relative">
                    <div className="w-2 h-2 left-[4px] top-[4px] absolute bg-[#f2c94c] rounded-full"></div>
                  </div>
                  <div className="text-[#002033] text-[10px] font-normal font-['Inter'] leading-[15px]">p50</div>
                </div>
                <div className="justify-start items-center gap-1 flex">
                  <div className="w-4 h-4 relative">
                    <div className="w-2 h-2 left-[4px] top-[4px] absolute bg-[#56b8f2] rounded-full"></div>
                  </div>
                  <div className="text-[#002033] text-[10px] font-normal font-['Inter'] leading-[15px]">p90</div>
                </div>
              </div>
            </div>
            <div className="h-64 relative">
              <div
                className="w-7 h-[206px] pl-px left-0 top-0 absolute flex-col justify-center items-center inline-flex">
                <div className="w-[27px] h-[206px] flex-col justify-between items-end inline-flex">
                  <div className="pl-3 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">4</div>
                    <div className="w-[5px] h-[0px] border border-[#004166]/20"></div>
                  </div>
                  <div className="pl-3 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">3</div>
                  </div>
                  <div className="pl-3 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">2</div>
                  </div>
                  <div className="pl-3.5 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">1</div>
                  </div>
                  <div className="pl-3 justify-end items-center gap-0.5 inline-flex">
                    <div className="text-right text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">0</div>
                    <div className="w-[5px] h-[0px] border border-[#004166]/20"></div>
                  </div>
                </div>
              </div>
              <div className="w-[385px] h-[206px] left-[28px] top-0 absolute">
                <div className="w-[385px] h-[206px] left-0 top-0 absolute justify-center items-center inline-flex">
                  <div className="w-[385px] h-[206px] bg-white border border-[#004166]/20"></div>
                </div>
                <div
                  className="w-[385px] h-[206px] left-0 top-0 absolute flex-col justify-between items-center inline-flex"></div>
                <div
                  className="w-[385px] h-[206px] left-0 top-0 absolute justify-between items-center inline-flex"></div>
              </div>
              <div
                className="w-[385px] h-7 pb-px left-[28px] top-[206px] absolute justify-center items-center inline-flex">
                <div className="w-[385px] h-[27px] justify-between items-start inline-flex">
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div className="w-[5px] h-[0px] border border-[#004166]/20"></div>
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">0
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">1
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">2
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">3
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">4
                    </div>
                  </div>
                  <div className="pr-1 origin-top-left rotate-90 justify-start items-center flex">
                    <div className="w-[5px] h-[0px] border border-[#004166]/20"></div>
                    <div
                      className="origin-top-left -rotate-90 text-center text-[#002033] text-xs font-normal font-['Inter'] leading-[18px]">5
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-96 h-[206px] left-[29px] top-[44px] absolute"></div>
        </div>
      </div>
      <CustomTable onEditFee={setEditedFeeIdx} onEditKeys={filterModalControls.on}/>
      <ModalFee editedFeeIdx={editedFeeIdx} isVisible={editedFeeIdx >= 0} onClose={() => setEditedFeeIdx(-1)}/>
      <ModalFilter isVisible={filterModalShown} onClose={filterModalControls.off}/>
    </div>
  </>);
}

export const ExampleArea = () => {
  const data = [
    {
      name: 'Page A',
      rangeOne: 4000,
      amt: 2400,
    }, {
      name: 'Page B',
      rangeOne: 3000,
      amt: 2210,
    }, {
      name: 'Page C',
      rangeOne: 2000,
      rangeTwo: 9800,
      amt: 2290,
    }, {
      name: 'Page D',
      rangeTwo: 3908,
      amt: 2000,
    }, {
      name: 'Page E',
      rangeTwo: 4800,
      rangeThree: 3190,
      amt: 2181,
    }, {
      name: 'Page F',
      rangeThree: 2390,
      amt: 2500,
    }, {
      name: 'Page G',
      rangeThree: 3490,
      amt: 2100,
    },
  ];
  return <div style={{
    width: '100%',
  }}>
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart width={500} height={200} data={data} margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Area type="monotone" dataKey="rangeOne" stroke="#8884d8" fill="blue"/>
        <Area type="monotone" dataKey="rangeTwo" stroke="#8884d8" fill="red"/>
        <Area type="monotone" dataKey="rangeThree" stroke="#8884d8" fill="green"/>
      </AreaChart>
    </ResponsiveContainer>
  </div>;
}

