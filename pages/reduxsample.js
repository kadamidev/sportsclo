import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  decrement,
  increment,
  incrementByAmount,
} from "../redux/reducers/counterSlice"
import { useSession } from "next-auth/react"

export default function reduxSample() {
  const { data: session } = useSession()

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  console.log(session)
  return (
    <div>
      hello wordl
      <h1>val: {count}</h1>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        increment by 5
      </button>
    </div>
  )
}
