export const observable = <T extends object>(target: T) => {
  return new Proxy(target, baseHandler) as T;
};

const baseHandler = {
  get(target, p, receiver) {
    const res = Reflect.get(target, p, receiver);
    // 存在响应器 则把此响应器和对象及属性进行绑定
    // 以后当此对象的这个顺序发生改变后重新执行此响应器
    if (currentReaction) {
      addRawReactionMap(target, p, currentReaction);
    }
    return res;
  },
  set(target, p, value, receiver) {
    const oldVal = Reflect.get(target, p, receiver);
    if (oldVal === value) return true;
    const flag = Reflect.set(target, p, value, receiver);
    rawReactionMap
      .get(target)
      ?.get(p)
      ?.forEach((reaction) => {
        if (typeof reaction._scheduler === "function") {
          reaction._scheduler();
        } else {
          reaction();
        }
      });
    return flag;
  },
} as ProxyHandler<any>;
const rawReactionMap = new WeakMap<object, Map<string | symbol, Set<any>>>();
/**
 *
 * @param target
 * @param key
 * @param reaction 目标响应器
 */
const addRawReactionMap = <T extends object>(
  target: T,
  key: string | symbol,
  reaction
) => {
  let reactionMap = rawReactionMap.get(target);
  if (!reactionMap) rawReactionMap.set(target, (reactionMap = new Map()));
  let reactions = reactionMap.get(key);
  if (!reactions) reactionMap.set(key, (reactions = new Set()));
  reactions.add(reaction);
  return reactionMap;
};

type Reaction = () => void;
let currentReaction = null;

export const autorun = (tracker: Reaction) => {
  const reaction = createReaction(tracker);
  reaction();
};

const createReaction = (tracker: Reaction) => {
  const reaction = () => {
    currentReaction = reaction;
    const res = tracker();
    currentReaction = null;
    return res;
  };
  return reaction;
};

export class Tracker {
  constructor(scheduler) {
    this.track._scheduler = scheduler;
  }
  track = ((tracker) => {
    currentReaction = this.track;
    const res = tracker();
    currentReaction = null;
    return res;
  }) as ((tracker: any) => any) & { _scheduler: any };
}
