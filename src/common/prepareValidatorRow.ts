import {CommitmentStatus, SlotContent} from "../store/websocketStore.ts";


// TODO isTransactionsApplied перенести внутрь компонента, он тут не нужен будет
export type CustomRow = {
  id: string
  leader: string
  slots: {commitment: CommitmentStatus, slot: number}[]
  transactions:{filtered:number, votedDiff:number, total:number}[]
  computeUnits:{amount: number, percent: number}[]
  earnedSol:number[]
  averageFee: number[]
  fee0: number[]
  fee1: number[]
  fee2: number[]
}
type FxType = (arg: [id: string, slots: SlotContent[]]) => CustomRow


export const prepareValidatorRow:FxType = ([id, slots]) => {
  const leader = slots[0]?.leader || 'UNKNOWN'
  return {
    id,
    leader,
    slots: slots.map(elt => ({
      commitment: elt.commitment,
      slot: elt.slot,
    })),
    // transactions: buildTransactions(slots, 'isTransactionsApplied'),
    transactions: slots.map(elt => {
      const total = elt.totalTransactions;
      const votedDiff = elt.totalTransactions - elt.totalTransactionsVote
      const filtered = elt.totalTransactionsFiltered
      return {filtered, votedDiff, total}
    }),
    computeUnits: slots.map(elt => {
      const amount = elt.totalUnitsConsumed;
      const percent = (elt.totalUnitsConsumed / 48_000_000);
      return {amount, percent}
    }),
    earnedSol: slots.map(elt => elt.totalFee / 1e9),
    averageFee: slots.map(elt => elt.feeAverage),
    fee0: slots.map(elt => elt.feeLevels[0]||0),
    fee1: slots.map(elt => elt.feeLevels[1]||0),
    fee2: slots.map(elt => elt.feeLevels[2]||0),
  }
}