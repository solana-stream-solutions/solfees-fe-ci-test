import type {FunctionComponent} from "../common/types";
import {CSSProperties, ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useState} from "react";
import {SlotContent, useWebSocketStore} from "../store/websocketStore.ts";
import {Table, TableColumn, TableFilters} from "@consta/uikit/Table";
import {IconInfoCircle} from '@consta/icons/IconInfoCircle';
import {IconFunnel} from '@consta/icons/IconFunnel';
import {IconEdit} from '@consta/icons/IconEdit';
import {IconAdd} from '@consta/icons/IconAdd';
import {withTooltip} from '@consta/uikit/withTooltip';
import {Button} from "@consta/uikit/Button";
import {TooltipProps} from "@consta/uikit/__internal__/src/hocs/withTooltip/withTooltip";
import {Text} from '@consta/uikit/Text';
import {AnimateIconBase} from "@consta/icons/AnimateIconBase";
import {IconRoute} from "@consta/icons/IconRoute";
import {IconPropView} from "@consta/icons/Icon";
import {IconCheck} from "@consta/icons/IconCheck";
import {IconAllDone} from "@consta/icons/IconAllDone";
import {Modal} from "@consta/uikit/Modal";
import {useFlag} from "@consta/uikit/useFlag";
import {TextField} from "@consta/uikit/TextField";
import {Chips} from "@consta/uikit/Chips";
import {Validator} from "../components/ui/Validator.tsx";
import {Slots} from "../components/ui/Slots.tsx";
import {ComputeUnits} from "../components/ui/ComputeUnits.tsx";
import {SimpleCell} from "../components/ui/SimpleCell.tsx";
import {useNavigate} from "@tanstack/react-router";
import {Epoch} from "../components/ui/Epoch.tsx";


type CommitmentStatus = 'processed' | 'confirmed' | 'finalized';

type ComProps = {
  value: CommitmentStatus
}


function getIcon(c: 'processed' | 'confirmed' | 'finalized'): string {
  switch (c) {
    case "processed":
      return '⏳'
    case "confirmed":
      return '✅'
    case "finalized":
      return '🏆'
    default:
      return '❓'
  }
}

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

function _calcPercent(num: number): string {
  return (num * 100).toFixed(2);
}

const statuses: CommitmentStatus[] = ['processed', 'confirmed', 'finalized']
const colors: IconPropView[] = ['ghost', 'primary', 'success']
const icons = [IconRoute, IconCheck, IconAllDone]
export const AnimateIconBaseIcons = ({value}: ComProps) => {
  const idx = statuses.findIndex(elt => elt === value)
  return (<AnimateIconBase
    view={colors[idx] || 'alert'}
    icons={icons}
    activeIndex={icons[idx] ? idx : 0}
  />);
};

const Commitment = ({value}: ComProps) => {

  const [isChanging, setIsChanging] = useState(false);
  useEffect(() => {
    setIsChanging(true)
    const q = setTimeout(() => setIsChanging(false), 300)
    return () => {
      setIsChanging(false)
      clearTimeout(q)
    }
  }, [value]);
  const classes = (isChanging ? ' bg-amber-200' : '')
  return <span className={classes}>{getIcon(value)}</span>
}


const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) => arr.reduce((groups, item) => {
  // @ts-ignore
  (groups[key(item)] ||= []).push(item);
  return groups;
}, {} as Record<K, T[]>);


const ButtonWithTooltip = withTooltip({content: 'Тултип сверху'})(Button);

const InfoButton = (props: TooltipProps): ReactNode => {
  return <ButtonWithTooltip as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconInfoCircle}
                            tooltipProps={props}/>
}


function formatDuration(seconds:number) {
  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;
  seconds |= 0;

  return `${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)`;
}

const TextWithTooltip = withTooltip({content: 'Тултип сверху'})(Text);


function buildTransactions(slots:SlotContent[]) {
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
const percentFromStore = (num?: number): number => {
  if (num) {
    const value = num / 100;
    return value;
  }
  return 0;
}

const CustomTable = ({
                       onEditFee,
                       onEditKeys,
                     }: TableProps) => {
  const slots = useWebSocketStore(state => state.slots);
  const disconnect = useWebSocketStore(state => state.disconnect)
  const connect = useWebSocketStore(state => state.connect)
  const percents = useWebSocketStore(state => state.percents)
  const readonlyKeys = useWebSocketStore(state => state.readonlyKeys)
  const readwriteKeys = useWebSocketStore(state => state.readwriteKeys)

  const memoFee0 = useCallback(() => onEditFee(0), [onEditFee])
  const memoFee1 = useCallback(() => onEditFee(1), [onEditFee])

  const rowsFromSocket = useMemo(() => {
    const groupByLeader: Record<string, {slots: SlotContent[], leader: string}> = {}
    let slice:SlotContent[] = [];
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
  const isTransactionsApplied = useMemo(() => {
    return !!readwriteKeys.length || !!readonlyKeys.length
  }, [readwriteKeys.length, readonlyKeys.length])
  const columns: TableColumn<typeof rowsFromSocket[number]>[] = [
    {
      width: 'auto' as unknown as number,
      title: 'Validator',
      accessor: 'leader',
      renderCell: (row) => <Validator leader={row.leader}/>,
    }, {
      width: 'auto' as unknown as number,
      align: 'right',
      title: 'Slots',
      accessor: 'slots',
      renderCell: (row) => <Slots items={row.slots}/>,
    }, {
      title: 'Transactions',
      accessor: 'transactions',
      align: 'right',
      control: () => (<Button style={{
        '--button-color': isTransactionsApplied ? 'red' : undefined,
        '--button-color-hover': isTransactionsApplied ? 'darkred' : undefined,
      } as unknown as CSSProperties} view="clear" size="s" onlyIcon iconRight={IconFunnel} onClick={onEditKeys}/>),
      renderCell: (row) => <span>{row.transactions.map(elt => <Text font="mono" className="whitespace-pre">{elt}</Text>)}</span>,
    }, {
      title: 'Compute Units',
      width: 'auto' as unknown as number,
      align: 'right',
      accessor: 'computeUnits',
      control: ({column}) => (<InfoButton content={column.title as string} direction={'downCenter'}/>),
      renderCell: (row) => <ComputeUnits items={row.computeUnits}/>,
    }, {
      title: 'Earned SOL',
      align: 'right',
      accessor: 'earnedSol',
      control: ({column}) => (<InfoButton content={column.title as string} direction={'downCenter'}/>),
      renderCell: (row) => <SimpleCell list={row.earnedSol}/>,
    }, {
      title: 'Average Fee',
      accessor: 'averageFee',
      align: 'right',
      control: ({column}) => (<InfoButton content={column.title as string} direction={'downCenter'}/>),
      renderCell: (row) => <SimpleCell list={row.averageFee}/>,
    }, {
      title: 'Fee p' + percentFromStore(percents[0]),
      accessor: 'fee0',
      align: 'right',
      control: () => (<Button as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconEdit} onClick={memoFee0}/>),
      renderCell: (row) => <SimpleCell list={row.fee0}/>,
    }, {
      title: 'Fee p' + percentFromStore(percents[1]),
      accessor: 'fee1',
      align: 'right',
      control: () => (<Button as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconEdit} onClick={memoFee1}/>),
      renderCell: (row) => <SimpleCell list={row.fee1}/>,
    }, {
      title: 'Add',
      accessor: 'add',
      control: () => (<Button as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconAdd}/>),
    },
  ];

  useEffect(() => {
    console.log('effect with connect!');
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  if (!slots.length) return <span
    className="w-full text-center text-xl font-bold">Loading...</span>

  return (<Table className="w-full2" columns={columns} rows={[...rowsFromSocket].reverse()}/>)
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

export const HomeOld = (): FunctionComponent => {
  const [filterModalShown, filterModalControls] = useFlag(false)
  const [editedFeeIdx, setEditedFeeIdx] = useState(-1)
  const navigate = useNavigate()

  return (<>
    <button className="absolute top-2 left-2 rounded bg-amber-300" onClick={() => navigate({to: '/'})}>
      click to <strong>NEW</strong> version
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
      <CustomTable onEditFee={setEditedFeeIdx} onEditKeys={filterModalControls.on}/>
      <ModalFee editedFeeIdx={editedFeeIdx} isVisible={editedFeeIdx >= 0} onClose={() => setEditedFeeIdx(-1)}/>
      <ModalFilter isVisible={filterModalShown} onClose={filterModalControls.off}/>
    </div>
  </>);
};
