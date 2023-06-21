"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'

export default function Home() {
  const respuesta = "CARRY";
  const [respuestaLetterAmount, setRespuestaLetterAmount] = useState<{ letter: string, amount: number }[]>([
    { letter: "C", amount: 1 },
    { letter: "A", amount: 1 },
    { letter: "R", amount: 2 },
    { letter: "Y", amount: 1 },
  ]);

  const respuestaLetterAmountCopy = respuestaLetterAmount;
  
  const detectKeyDown = useRef<((e: KeyboardEvent) => void) | null>(null);
  const [typedWord, setTypedWord] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);

  const updateAmount = (letter: string) => {
    setRespuestaLetterAmount((prevState) =>
      prevState.map((item) =>
        item.letter === letter ? { ...item, amount: item.amount - 1 } : item
      )
    );
  };

  useEffect(() => {
    detectKeyDown.current = (e: KeyboardEvent) => {
      console.log("Clicked +", e.key);
      const isAlphabet = /^[a-zA-ZñÑ]$/.test(e.key);

      if (e.key === 'Enter') {
        const wordToCheck = typedWord.join('');
        setGuesses((prevGuess) => [...prevGuess, wordToCheck]);
        console.log('Guesses:', wordToCheck);
        setTypedWord([]);
      } else if (e.key === 'Backspace') {
        setTypedWord((prevTypedWord) => prevTypedWord.slice(0, -1));
      } else if (isAlphabet) {
        setTypedWord((prevTypedWord) => [...prevTypedWord, e.key.toUpperCase()]);
      } else {
        console.log("Not in the alphabet.")
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
  {guesses.map((guess, index) => (
    <div key={index} className="z-10 w-full max-w-5xl items-center justify-center font-mono sm:flex">
      {Array.from(guess).map((letterFromGuess, indexLetter) => {
        let imageSrc;


        if (respuesta.includes(letterFromGuess)) {
          updateAmount(letterFromGuess);

          imageSrc = "/images/rip-r_rip-l.png";
          //Checking if we are validating for the first letter of the guess
          if(indexLetter == 0){
            //Checking if the letter is at the beginning of the word
            if(respuesta[0] == letterFromGuess){
              //Check if the next letter is valid
              if(respuesta[1] == guess[1]){
                imageSrc = "/images/com-r_com-l.png";
              }else{
                imageSrc = "/images/rip-r_com-l.png";
              }
            }
          }
          //Checking if we are validating for the last letter of the guess
          else if(indexLetter == guess.length - 1){
            //Checking if the letter is at the end of the word
            if(respuesta[respuesta.length - 1] == letterFromGuess){
              //Check if the next letter is valid
              
              if(respuesta[respuesta.length - 2] == guess[guess.length - 2]){
                
                imageSrc = "/images/com-r_com-l.png";
              }else{
                imageSrc = "/images/com-r_rip-l.png";
              }
            }
          } else {
            // Checking other letters
            imageSrc = "/images/rip-r_rip-l.png";
            
            let frontIsValid = (respuesta[indexLetter + 1] == guess[indexLetter + 1]);
            let backIsValid = (respuesta[indexLetter - 1] == guess[indexLetter - 1]);
            if (frontIsValid && backIsValid) {
              imageSrc = "/images/com-r_com-l.png";
            }else if (frontIsValid){
              imageSrc = "/images/com-r_rip-l.png";
            }else if (backIsValid){
              imageSrc = "/images/rip-r_com-l.png";
            }
          }
        } else {
          imageSrc = "/images/empty.png";
        }

        return (
          <div key={indexLetter} className="relative">
            <Image
              src={imageSrc}
              width={50}
              height={50}
              alt="Image"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <p className="text-xl">{letterFromGuess}</p>
            </div>
          </div>
        );
      })}
    </div>
  ))}

  <div className="z-10 w-full max-w-5xl items-center justify-center font-mono sm:flex">
    {typedWord.map((item, index) => (
      <div key={index} className="relative">
        <Image
          src="/images/empty.png"
          width={50}
          height={50}
          alt="Empty Image"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <p className="text-xl">{item}</p>
        </div>
      </div>
    ))}
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
