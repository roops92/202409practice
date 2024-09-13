'use client'
import Image from "next/image";
import { useState } from 'react';
import "./style.css";
import next from "next";

function Square({value, onSquareClick}:{value:String, onSquareClick:Function}){
  return (<button className="square" onClick={() => {onSquareClick()}}>
    {value}
    </button>
    );
}


export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares,setSquares] = useState<String[]>(Array(9).fill(null));
  
  function handleClick(i:number){
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "Winner:" + winner;
  }else{
    status = "Next player:"+(xIsNext ? "X" : "O");
  }

  return (

    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      
      <div className="flex min-h-screen flex-col items-center justify-start p-24">
        <div className="status">{status}</div>
          <div className="board-row">
            <Square value = {squares[0]} onSquareClick={ () => handleClick(0)} />
            <Square value = {squares[1]} onSquareClick={ () => handleClick(1)} />
            <Square value = {squares[2]} onSquareClick={ () => handleClick(2)} />
          </div>
        <div className="board-row">
          <Square value = {squares[3]} onSquareClick={ () => handleClick(3)} />
          <Square value = {squares[4]} onSquareClick={ () => handleClick(4)} />
          <Square value = {squares[5]} onSquareClick={ () => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value = {squares[6]} onSquareClick={ () => handleClick(6)} />
          <Square value = {squares[7]} onSquareClick={ () => handleClick(7)} />
          <Square value = {squares[8]} onSquareClick={ () => handleClick(8)} />
        </div>
        <a
          href="http://localhost:3000/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            戻る{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>   
        </a>
      </div>
    </main>
  );
}

function calculateWinner(squares:String[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) { //lineの回数分ループ
    const [a, b, c] = lines[i]; //i=0の場合lines[0,1,2],square[i](XまたはO)が３目並べたら
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null; //返される処理→三目揃う、
}
