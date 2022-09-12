import { Tracker } from "../reactive";
import { useRef,useReducer } from "react";

export function Observer(props) {
  // 组件强制刷新
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // 跟踪ref
  const trackerRef = useRef(null);
  if (!trackerRef.current) {
    // 创建一个手动的跟踪器
    trackerRef.current = new Tracker(forceUpdate);
  }
  return trackerRef.current.track(props.children);
}
