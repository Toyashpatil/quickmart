// src/App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../Redux/Counter/counterSlice';
import { setName } from '../Redux/Auth/authSlice';

function Test() {
  const count = useSelector((state) => state.counter.value);
  const UserName = useSelector((state) => state.auth.name);

  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Redux Toolkit Counter</h1>
      <h1>{UserName}</h1>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(setName("Jiya"))}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
    </div>
  );
}

export default Test;
