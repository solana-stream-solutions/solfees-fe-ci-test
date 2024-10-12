import type {FunctionComponent} from "../common/types";
import {CSSProperties, ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useState} from "react";
import {SlotContent, useWebSocketStore} from "../store/websocketStore.ts";
import {Table, TableColumn} from '@consta/table/Table';
import {IconInfoCircle} from '@consta/icons/IconInfoCircle';
import {IconFunnel} from '@consta/icons/IconFunnel';
import {IconEdit} from '@consta/icons/IconEdit';
import {IconAdd} from '@consta/icons/IconAdd';
import {withTooltip} from '@consta/uikit/withTooltip';
import {Button} from "@consta/uikit/Button";
import {TooltipProps} from "@consta/uikit/__internal__/src/hocs/withTooltip/withTooltip";
import {Text} from '@consta/uikit/Text';
import {Modal} from "@consta/uikit/Modal";
import {useFlag} from "@consta/uikit/useFlag";
import {TextField} from "@consta/uikit/TextField";
import {Chips} from "@consta/uikit/Chips";
import {Validator} from "../components/ui/Validator.tsx";
import {Slots} from "../components/ui/Slots.tsx";
import {Transactions} from "../components/ui/Transactions.tsx";
import {ComputeUnits} from "../components/ui/ComputeUnits.tsx";
import {Epoch} from "../components/ui/Epoch.tsx";
import {HeaderDataCell} from "@consta/table/HeaderDataCell";
import {SimpleCell} from "../components/ui/SimpleCell.tsx";
import {useNavigate} from "@tanstack/react-router";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';


const IconFeed = ({className = ''}): ReactNode => {
  return <svg className={className} width="20" height="21" viewBox="0 0 20 21" fill="none"
              xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_5834_12840)">
      <path
        d="M5.45455 17.7727C5.45455 18.5303 5.18939 19.1742 4.65909 19.7045C4.12879 20.2348 3.48485 20.5 2.72727 20.5C1.9697 20.5 1.32576 20.2348 0.795455 19.7045C0.265152 19.1742 0 18.5303 0 17.7727C0 17.0152 0.265152 16.3712 0.795455 15.8409C1.32576 15.3106 1.9697 15.0455 2.72727 15.0455C3.48485 15.0455 4.12879 15.3106 4.65909 15.8409C5.18939 16.3712 5.45455 17.0152 5.45455 17.7727ZM12.7273 19.5199C12.7462 19.785 12.6657 20.0123 12.4858 20.2017C12.3153 20.4006 12.0928 20.5 11.8182 20.5H9.90057C9.66383 20.5 9.46023 20.4219 9.28977 20.2656C9.11932 20.1094 9.02462 19.9129 9.00568 19.6761C8.79735 17.5076 7.92377 15.6539 6.38494 14.1151C4.84612 12.5762 2.99242 11.7027 0.823864 11.4943C0.587121 11.4754 0.390625 11.3807 0.234375 11.2102C0.078125 11.0398 0 10.8362 0 10.5994V8.68182C0 8.4072 0.0994318 8.18466 0.298295 8.0142C0.45928 7.85322 0.662879 7.77273 0.909091 7.77273H0.980114C2.49527 7.89583 3.94413 8.27699 5.3267 8.91619C6.70928 9.5554 7.93561 10.4148 9.00568 11.4943C10.0852 12.5644 10.9446 13.7907 11.5838 15.1733C12.223 16.5559 12.6042 18.0047 12.7273 19.5199ZM20 19.5483C20.0189 19.804 19.9337 20.0265 19.7443 20.2159C19.5739 20.4053 19.3561 20.5 19.0909 20.5H17.0597C16.8134 20.5 16.6027 20.4171 16.4276 20.2514C16.2524 20.0857 16.16 19.8845 16.1506 19.6477C16.0369 17.6117 15.5587 15.6776 14.7159 13.8452C13.8731 12.0128 12.777 10.4219 11.4276 9.07244C10.0781 7.72301 8.48722 6.62689 6.65483 5.78409C4.82244 4.94129 2.88826 4.45833 0.852273 4.33523C0.61553 4.32576 0.414299 4.23343 0.24858 4.05824C0.0828598 3.88305 0 3.67708 0 3.44034V1.40909C0 1.14394 0.094697 0.926136 0.284091 0.755682C0.454545 0.585227 0.662879 0.5 0.909091 0.5H0.951705C3.43277 0.623106 5.80729 1.19129 8.07528 2.20455C10.3433 3.2178 12.358 4.60985 14.1193 6.38068C15.8902 8.14205 17.2822 10.1567 18.2955 12.4247C19.3087 14.6927 19.8769 17.0672 20 19.5483Z"
        fill="#0AD289"/>
    </g>
    <defs>
      <clipPath id="clip0_5834_12840">
        <rect width="20" height="20" fill="white" transform="translate(0 0.5)"/>
      </clipPath>
    </defs>
  </svg>

}

const ButtonWithTooltip = withTooltip({content: 'Тултип сверху'})(Button);

const InfoButton = (props: TooltipProps): ReactNode => {
  return <ButtonWithTooltip as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconInfoCircle}
                            tooltipProps={props}/>
}


const percentFromStore = (num?: number): number => {
  if (num) {
    const value = num / 100;
    return value;
  }
  return 0;
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
    return Object.entries(unsorted).sort((a,b) => Number(a[0])-Number(b[0])).map(([id, slots]) => {
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
  if(isSimple) return <>
  <div className="w-full overflow-x-auto">
    {rowsFromSocket2.map((row) => {
      return <div className="border flex flex-row gap-1" key={`${row.leader}-${(row.slots[0].slot/4)|0}`}>
        <div className="bg-red-100">{row.leader}</div>
        <div>
          {row.slots.map((slot) => (
            <div className="bg-green-100" key={slot.slot}>
              {slot.commitment}-{slot.slot}
            </div>
          ))}
        </div>
        <div>
        {row.fee0.map((elt, idx) => (
          <div className="bg-blue-100" key={idx}>
            {elt}
          </div>
        ))}
        </div>
        <div>
        {row.fee1.map((elt, idx) => (
          <div className="bg-red-100" key={idx}>
            {elt}
          </div>
        ))}
        </div>
        <div>
        {row.averageFee.map((elt, idx) => (
          <div className="bg-green-100" key={idx}>
            {elt}
          </div>
        ))}
        </div>
        <div>
        {row.earnedSol.map((elt, idx) => (
          <div className="bg-blue-100" key={idx}>
            {elt}
          </div>
        ))}
        </div>
        <div>
        {row.computeUnits.map((elt, idx) => (
          <div className="bg-red-100" key={idx}>
            {elt.amount}-{elt.percent}
          </div>
        ))}
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

type ModalFeeProps = {
  isVisible: boolean;
  onClose: () => void;
  editedFeeIdx: number;
}

const modalFeeItems = [50, 60, 70, 80, 90].map(elt => ({label: `${elt}`}))
const ModalFee = ({
                    isVisible,
                    onClose,
                    editedFeeIdx,
                  }: ModalFeeProps) => {
  const fees = useWebSocketStore(state => state.percents)
  const updatePercents = useWebSocketStore(state => state.updatePercents)
  const updateSubscription = useWebSocketStore(state => state.updateSubscription)
  const {
          disconnect,
          connect,
        } = useWebSocketStore(({
                                 disconnect,
                                 connect,
                               }) => (({
    disconnect,
    connect,
  })))
  const [feeValue, setFeeValue] = useState('');
  useLayoutEffect(() => {
    if (isVisible) {
      const value = percentFromStore(fees[editedFeeIdx] || 0);
      setFeeValue(`${value}`)
    }
  }, [editedFeeIdx, isVisible])
  const onClickButton = () => {
    const newPercents = fees.map((elt, idx) => {
      if (idx === editedFeeIdx) return +(+feeValue * 100).toFixed(2);
      return elt;
    })
    updatePercents(newPercents)
    // updateSubscription();
    disconnect();
    connect();
    onClose();
  }
  return <Modal
    isOpen={isVisible}
    hasOverlay
    onClickOutside={onClose}
    onEsc={onClose}
    className="flex flex-col gap-4 p-6"
  >
    <Text as="h1" size="2xl" view="primary">
      Fee percentile
    </Text>
    <div className="flex flex-col gap-2">
      <TextField
        onChange={value => setFeeValue(value || '')}
        value={feeValue}
        type="number"
        placeholder="1-100"
        incrementButtons={false}
      />
      <Chips interactive items={modalFeeItems} onItemClick={item => setFeeValue(item.label)} size="xs"/>
    </div>
    <Button
      view="primary"
      label="Done"
      width="full"
      onClick={onClickButton}
    />
  </Modal>
}

type ModalFilterProps = {
  isVisible: boolean;
  onClose: () => void;
}

const ModalFilter = ({
                       isVisible,
                       onClose,
                     }: ModalFilterProps) => {
  const [rwValue, setRwValue] = useState('');
  const [roValue, setRoValue] = useState('');
  const savedReadonlyKeys = useWebSocketStore(state => state.readonlyKeys)
  const savedReadwriteKeys = useWebSocketStore(state => state.readwriteKeys)
  const updateRo = useWebSocketStore(state => state.updateReadonlyKeys)
  const updateRw = useWebSocketStore(state => state.updateReadwriteKeys)
  const updateSubscription = useWebSocketStore(state => state.updateSubscription)
  const {
          disconnect,
          connect,
        } = useWebSocketStore(({
                                 disconnect,
                                 connect,
                               }) => (({
    disconnect,
    connect,
  })))

  const onClickButton = () => {
    // Может быть проблема, что пишет массив с одним элементом "" (пустая строка). Уточнить потом.
    updateRo(roValue.split("\n"));
    updateRw(rwValue.split("\n"));
    // updateSubscription();
    disconnect();
    connect();
    onClose();
  }
  useLayoutEffect(() => {
    if (isVisible) {
      setRoValue(savedReadonlyKeys.join("\n"))
      setRwValue(savedReadwriteKeys.join("\n"))
    }
  }, [isVisible])

  return <Modal
    isOpen={isVisible}
    hasOverlay
    onClickOutside={onClose}
    onEsc={onClose}
    className="flex flex-col gap-4 p-6 min-w-[50%]"
  >
    <Text as="h1" size="2xl" view="primary">
      Filter transactions
    </Text>
    <div className="flex flex-col gap-2">
      <TextField
        className="min-w-80 custom-nowrap-textarea"
        label="Read-write pubkeys"
        labelPosition="top"
        type="textarea"
        onChange={value => setRwValue(value || '')}
        value={rwValue}
        placeholder="Pubkeys"
        minRows={3 as unknown as undefined}
        maxRows={10 as unknown as undefined}
      />
    </div>
    <div className="flex flex-col gap-2">
      <TextField
        className="min-w-80 custom-nowrap-textarea"
        label="Read-only pubkeys"
        labelPosition="top"
        type="textarea"
        onChange={value => setRoValue(value || '')}
        value={roValue}
        placeholder="Pubkeys"
        minRows={3 as unknown as undefined}
        maxRows={10 as unknown as undefined}
      />
    </div>
    <Button
      view="primary"
      label="Done"
      width="full"
      onClick={onClickButton}
    />
  </Modal>
}

export const Home= (): FunctionComponent => {
  const [filterModalShown, filterModalControls] = useFlag(false)
  const [editedFeeIdx, setEditedFeeIdx] = useState(-1)

  const navigate = useNavigate()

  return (<>
    <button className="absolute top-2 left-2 rounded bg-amber-300" onClick={() => navigate({to: '/homeOld'})}>click to
      old version
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
  const data = [{
    name: 'Page A',
    rangeOne: 4000,
    amt: 2400
  }, {
    name: 'Page B',
    rangeOne: 3000,
    amt: 2210
  }, {
    name: 'Page C',
    rangeOne: 2000,
    rangeTwo: 9800,
    amt: 2290
  }, {
    name: 'Page D',
    rangeTwo: 3908,
    amt: 2000
  }, {
    name: 'Page E',
    rangeTwo: 4800,
    rangeThree: 3190,
    amt: 2181
  }, {
    name: 'Page F',
    rangeThree: 2390,
    amt: 2500
  }, {
    name: 'Page G',
    rangeThree: 3490,
    amt: 2100
  }];
  return <div style={{
    width: '100%'
  }}>
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart width={500} height={200} data={data} margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="rangeOne" stroke="#8884d8" fill="blue" />
        <Area type="monotone" dataKey="rangeTwo" stroke="#8884d8" fill="red" />
        <Area type="monotone" dataKey="rangeThree" stroke="#8884d8" fill="green" />
      </AreaChart>
    </ResponsiveContainer>
  </div>;
}

