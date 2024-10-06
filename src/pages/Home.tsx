import type {FunctionComponent} from "../common/types";
import {CSSProperties, ReactNode, useEffect, useState} from "react";
import {useWebSocketStore} from "../store/websocketStore.ts";
import {Table, TableColumn, TableFilters} from "@consta/uikit/Table";
import {IconInfoCircle} from '@consta/icons/IconInfoCircle';
import {IconFunnel} from '@consta/icons/IconFunnel';
import {IconEdit} from '@consta/icons/IconEdit';
import {IconAdd} from '@consta/icons/IconAdd';
import {withTooltip} from '@consta/uikit/withTooltip';
import {Button} from "@consta/uikit/Button";
import {TooltipProps} from "@consta/uikit/__internal__/src/hocs/withTooltip/withTooltip";

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

const _Commitment = (props: ComProps) => {
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


const ButtonWithTooltip = withTooltip({content: 'Тултип сверху'})(Button);

const InfoButton = (props: TooltipProps): ReactNode => {
  return <ButtonWithTooltip as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconInfoCircle}
                            tooltipProps={props}/>
}


const CustomTable = () => {
  const {
          connect,
          disconnect,
          slots,
        } = useWebSocketStore();
  slots;
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  const rows = [
    {
      id: '1',
      validator: 'Eg4ut7ubhJrt8934eEg4ut7ubhJrt8934e',
      slot: ['23832818329', '23832818329'],
      transactions: ['1000/1000', '1000/1000'],
      computeUnits: ['34,789,456 (54%)', '34,789,456 (54%)'],
      earnedSol: ['0,00632', '0,00632'],
      averageFee: ['837,271,28', '837,271,28'],
      feeP50: ['37,280', '37,280'],
      feeP90: ['280,194', '280,194'],
      add: [],
    }, {
      id: '2',
      validator: 'Eg4ut7ubhJrt8934eEg4ut7ubhJrt8934e',
      slot: ['23832818329', '23832818329'],
      transactions: ['1000/1000', '1000/1000'],
      computeUnits: ['34,789,456 (54%)', '34,789,456 (54%)'],
      earnedSol: ['0,00632', '0,00632'],
      averageFee: ['837,271,28', '837,271,28'],
      feeP50: ['37,280', '37,280'],
      feeP90: ['280,194', '280,194'],
      add: [],
    }, {
      id: '3',
      validator: 'Eg4ut7ubhJrt8934eEg4ut7ubhJrt8934e',
      slot: ['23832818329', '23832818329'],
      transactions: ['1000/1000', '1000/1000'],
      computeUnits: ['34,789,456 (54%)', '34,789,456 (54%)'],
      earnedSol: ['0,00632', '0,00632'],
      averageFee: ['837,271,28', '837,271,28'],
      feeP50: ['37,280', '37,280'],
      feeP90: ['280,194', '280,194'],
      add: [],
    }, {
      id: '4',
      validator: 'Eg4ut7ubhJrt8934eEg4ut7ubhJrt8934e',
      slot: ['23832818329', '23832818329'],
      transactions: ['1000/1000', '1000/1000'],
      computeUnits: ['34,789,456 (54%)', '34,789,456 (54%)'],
      earnedSol: ['0,00632', '0,00632'],
      averageFee: ['837,271,28', '837,271,28'],
      feeP50: ['37,280', '37,280'],
      feeP90: ['280,194', '280,194'],
      add: [],
    }, {
      id: '5',
      validator: 'Eg4ut7ubhJrt8934eEg4ut7ubhJrt8934e',
      slot: ['23832818329', '23832818329'],
      transactions: ['1000/1000', '1000/1000'],
      computeUnits: ['34,789,456 (54%)', '34,789,456 (54%)'],
      earnedSol: ['0,00632', '0,00632'],
      averageFee: ['837,271,28', '837,271,28'],
      feeP50: ['37,280', '37,280'],
      feeP90: ['280,194', '280,194'],
      add: [],
    }, {
      id: '6',
      validator: 'Eg4ut7ubhJrt8934eEg4ut7ubhJrt8934e',
      slot: ['23832818329', '23832818329'],
      transactions: ['1000/1000', '1000/1000'],
      computeUnits: ['34,789,456 (54%)', '34,789,456 (54%)'],
      earnedSol: ['0,00632', '0,00632'],
      averageFee: ['837,271,28', '837,271,28'],
      feeP50: ['37,280', '37,280'],
      feeP90: ['280,194', '280,194'],
      add: [],
    },
  ];

  const columns: TableColumn<typeof rows[number]>[] = [
    {
      title: 'Validator',
      accessor: 'validator',
      renderCell: (row) => <span><span className="font-bold">Validator Name:</span><br/>{row.validator}</span>,
    }, {
      title: 'Slots',
      accessor: 'slot',
      renderCell: (row) => <span>{row.slot.map(elt => <div>{elt}</div>)}</span>,
    }, {
      title: 'Transactions',
      accessor: 'transactions',
      control: () => (<Button style={{
        '--button-color': 'red',
        '--button-color-hover': 'darkred',
      } as unknown as CSSProperties} view="clear" size="s" onlyIcon iconRight={IconFunnel}/>),
      renderCell: (row) => <span>{row.transactions.map(elt => <div>{elt}</div>)}</span>,
    }, {
      title: 'Compute Units',
      accessor: 'computeUnits',
      control: ({column}) => (
        <InfoButton content={column.title as string} direction={'downCenter'}/>),
      renderCell: (row) => <span>{row.computeUnits.map(elt => <div>{elt}</div>)}</span>,
    }, {
      title: 'Earned SOL',
      accessor: 'earnedSol',
      control: ({column}) => (
        <InfoButton content={column.title as string} direction={'downCenter'}/>),
      renderCell: (row) => <span>{row.earnedSol.map(elt => <div>{elt}</div>)}</span>,
    }, {
      title: 'Average Fee',
      accessor: 'averageFee',
      control: ({column}) => (
        <InfoButton content={column.title as string} direction={'downCenter'}/>),
      renderCell: (row) => <span>{row.averageFee.map(elt => <div>{elt}</div>)}</span>,
    }, {
      title: 'Fee p50',
      accessor: 'feeP50',
      control: () => (
        <Button as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconEdit}/>),
      renderCell: (row) => <span>{row.feeP50.map(elt => <div>{elt}</div>)}</span>,
    }, {
      title: 'Fee p90',
      accessor: 'feeP90',
      control: () => (
        <Button as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconEdit}/>),
      renderCell: (row) => <span>{row.feeP90.map(elt => <div>{elt}</div>)}</span>,
    }, {
      title: 'Add',
      accessor: 'add',
      control: () => (
        <Button as="span" iconSize="s" onlyIcon={true} view="clear" iconRight={IconAdd}/>),
    },
  ];
  const _filters: TableFilters<typeof rows[number]> = [
    {
      id: 'f-t',
      name: 'trans-filter',
      filterer: (value) => value === 'Антон',
      field: 'transactions',
    },
  ];

  return (<Table className="w-full" columns={columns} rows={rows}/>)
}


export const Home = (): FunctionComponent => {
  return (<>
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
        <div className="flex-col justify-start items-end gap-1 inline-flex">
          <div className="self-stretch justify-between items-end inline-flex">
            <div className="justify-start items-end gap-1 flex">
              <div className="text-center text-[#002033] text-sm font-normal font-['Inter'] leading-[21px]">Epoch</div>
              <div className="text-center text-[#09d288] text-xs font-normal font-['Inter'] leading-[18px]">676</div>
            </div>
            <div className="text-center text-[#002033] text-[10px] font-normal font-['Inter'] leading-[15px]">in a day
            </div>
          </div>
          <div className="w-[200px] h-[3px] relative">
            <div className="w-[200px] h-[3px] left-0 top-0 absolute bg-[#004166]/20 rounded"></div>
            <div className="w-[89px] h-[3px] left-0 top-0 absolute bg-[#09d288] rounded"></div>
          </div>
          <div className="text-[#002033]/60 text-[10px] font-normal font-['Inter'] leading-[15px]">48.36%</div>
        </div>
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
      <CustomTable/>
    </div>
  </>);
};
