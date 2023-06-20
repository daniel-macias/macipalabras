"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function Home() {

  const detectKeyDown = useRef<((e: KeyboardEvent) => void) | null>(null);
  const [typedWord, setTypedWord] = useState<string[]>([]);

  useEffect(() => {
    detectKeyDown.current = (e: KeyboardEvent) => {
      console.log("Clicked +", e.key);

      if (e.key === 'Enter') {
        console.log('Typed Word:', typedWord);
        setTypedWord([]);
      } else if (e.key === 'Backspace') {
        setTypedWord((prevTypedWord) => prevTypedWord.slice(0, -1));
      } else {
        setTypedWord((prevTypedWord) => [...prevTypedWord, e.key]);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      detectKeyDown.current?.(e);
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [typedWord]);


  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className="z-10 w-full max-w-5xl items-center justify-center font-mono   sm:flex">
          <p className="text-2xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
            A
          </p>
          <p className="text-2xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
            B
          </p>
          <p className="text-2xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
            C
          </p>
          <p className="text-2xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
            D
          </p>
          <p className="text-2xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
            E
          </p>
        </div>

        <div className="z-10 w-full max-w-5xl items-center justify-center font-mono   sm:flex">
          <p className="text-2xl fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
            A
          </p>
          <p className="text-2xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
            B
          </p>
          <p className="text-2xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
            C
          </p>
          <p className="text-2xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
            D
          </p>
          <p className="text-2xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
            E
          </p>
          <p className="text-2xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
            F
          </p>
        </div>
      </div>
      

      <div>
        <div className="z-10 w-full max-w-5xl items-center justify-center font-mono   sm:flex">
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              Q
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              W
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              E
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              R
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              T
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              Y
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              U
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              I
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              O
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              P
            </p>
            
          </div>
          <div className="z-10 w-full max-w-5xl items-center justify-center font-mono   sm:flex">
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              A
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              S
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              D
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              F
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              G
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              H
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              J
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              K
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              L
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              Ñ
            </p>
            
          </div>
          <div className="z-10 w-full max-w-5xl items-center justify-center font-mono   sm:flex">
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              ENTER
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              Z
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              X
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              C
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              V
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              B
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              N
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              M
            </p>
            <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
              ERASE
            </p>
          </div>
          

        

      </div>
      
      
      
    </div>

    
  )
}
