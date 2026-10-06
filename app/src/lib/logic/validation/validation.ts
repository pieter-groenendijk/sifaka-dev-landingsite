const judge_StateDetermined = 0;
const judge_StatePending = 100;
const judge_StateUndetermined = 200;
export const enum judge_State {
  /** Determined to be good */
  Good = judge_StateDetermined,
  /** Determined to be bad. */
  Bad,
  /** In the process of determining. */
  Pending = judge_StatePending,
  /** Scheduled to be determined. */
  Planned,
  /** Not determined and not in the process of. */
  Undetermined = judge_StateUndetermined,
}




export interface judge_Judgement {
  State: judge_State,
  Message: string,
}



export type judge_Value = string | number | undefined;
export type judge_Judger<value extends judge_Value>
  = (judgement: judge_Judgement, value: value) => void;

export interface judge_Handler<value extends judge_Value> {
  Value: value;

  State: judge_State,
  Message: string,

  judgeTimeoutId: number;
  Judge: judge_Judger<value>
}

export function judge_HandlerCreate<value extends judge_Value>(judge: judge_Judger<value>, initValue: value): judge_Handler<value> {
  return {
    Value: initValue,

    State: judge_State.Undetermined,
    Message: "",

    judgeTimeoutId: -1, // setTimeout() only returns positive integers
    Judge: judge,
  }
}


export function judge_HandlerIsDetermined(handler: judge_Handler<any>): boolean {
  return handler.State < judge_StatePending;
}

export function judge_HandlerIsPending(handler: judge_Handler<any>): boolean {
  return handler.State >= judge_StatePending && handler.State < judge_StateUndetermined;
}

export function judge_HandlerIsUndetermined(handler: judge_Handler<any>): boolean {
  return handler.State >= judge_StateUndetermined;
}


function onUpdate<value extends judge_Value>(handler: judge_Handler<value>, value: value): void {
  clearTimeout(handler.judgeTimeoutId);
  handler.judgeTimeoutId = setTimeout(() => {
    handler.State = judge_State.Pending;
    handler.Judge(handler, value);
  }, 500);

  handler.State = judge_State.Planned;
}

function onCommit<value extends judge_Value>(handler: judge_Handler<value>, value: value): void {
  clearTimeout(handler.judgeTimeoutId);
  if (!judge_HandlerIsDetermined(handler)) {
    handler.State = judge_State.Pending;
    handler.Judge(handler, value);
  }
}
