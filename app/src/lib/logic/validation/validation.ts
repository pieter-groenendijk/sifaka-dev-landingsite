const judge_StateDetermined = 0;
const judge_StatePending = 100;
const judge_StateUndetermined = 200;
export const enum judge_State {
  /** Determined to be good */
  Good = judge_StateDetermined,
  /** Determined to be bad. */
  Bad = judge_StateDetermined + 1,
  /** In the process of determining. */
  Pending = judge_StatePending,
  /** Scheduled to be determined. */
  Planned = judge_StatePending + 1,
  /** Not determined and not in the process of. */
  Undetermined = judge_StateUndetermined,
}

export type judge_Value = string | number | undefined | null;
export type judge_Judger<value extends judge_Value> = (judgement: judge_Judgement, value: value) => void;

export interface judge_Judgement {
  State: judge_State,
  Message: string,
}

export function judge_JudgementCreate(): judge_Judgement {
  return {
    State: judge_State.Undetermined,
    Message: "",
  }
}

export interface judge_Handler<value extends judge_Value> {
  Value: value,

  Judgement: judge_Judgement,

  judgeTimeoutId: number,
  Judge: judge_Judger<value>,
}

export function judge_HandlerCreate<value extends judge_Value>(judge: judge_Judger<value>, initValue: value): judge_Handler<value> {
  return {
    Value: initValue,

    Judgement: {
      State: judge_State.Undetermined,
      Message: "",
    },

    judgeTimeoutId: -1, // setTimeout() only returns positive integers
    Judge: judge,
  }
}


export function judge_IsDetermined(judgement: judge_Judgement): boolean {
  return judgement.State < judge_StatePending;
}

export function judge_IsPending(judgement: judge_Judgement): boolean {
  return judgement.State >= judge_StatePending && judgement.State < judge_StateUndetermined;
}

export function judge_IsUndetermined(judgement: judge_Judgement): boolean {
  return judgement.State >= judge_StateUndetermined;
}


export function judge_HandlerUpdate(handler: judge_Handler<any>): void {
  clearTimeout(handler.judgeTimeoutId);
  handler.judgeTimeoutId = setTimeout(() => {
    handler.Judgement.State = judge_State.Pending;
    handler.Judge(handler.Judgement, handler.Value);
  }, 500);

  handler.Judgement.State = judge_State.Planned;
}

export function judge_HandlerCommit(handler: judge_Handler<any>): void {
  clearTimeout(handler.judgeTimeoutId);
  if (!judge_IsDetermined(handler.Judgement)) {
    handler.Judgement.State = judge_State.Pending;
    handler.Judge(handler.Judgement, handler.Value);
  }
}
