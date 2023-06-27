"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import Button from '@mui/base/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faEquals } from '@fortawesome/free-solid-svg-icons'
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const respuesta = "CARRY";

  const detectKeyDown = useRef<((e: KeyboardEvent) => void) | null>(null);
  const [typedWord, setTypedWord] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState(false);

  function getLetterAmount(word: string): Map<string, number> {
    const letterCount: Map<string, number> = new Map();

    // Count the appearances of each letter in the word
    for (const letter of word) {
      if (letterCount.has(letter)) {
        letterCount.set(letter, letterCount.get(letter)! + 1);
      } else {
        letterCount.set(letter, 1);
      }
    }

    return letterCount;
  }

  const renderGuesses = () => {
    // Your code here to process the guesses or perform any other logic

    let answerLetterAmount = getLetterAmount(respuesta);


    return guesses.map((guess, index) => (
      <div>
        <div key={index} className="z-10 w-full max-w-5xl items-center justify-center font-mono sm:flex py-2">
          {Array.from(guess).map((letterFromGuess, indexLetter) => {
            let imageSrc;

            if (respuesta.includes(letterFromGuess)) {

              let guessLetterAmount = getLetterAmount(guess);
              let isCorrectSolution = respuesta == guess ? true : false;

              if (answerLetterAmount.get(letterFromGuess) == guessLetterAmount.get(letterFromGuess)) {

                if (isCorrectSolution) {
                  if (respuesta[0] == letterFromGuess) {
                    imageSrc = "/images/complete-l.png";
                  } else if (respuesta[respuesta.length - 1] == letterFromGuess) {
                    imageSrc = "/images/complete-r.png";
                  } else {
                    imageSrc = "/images/complete-mid.png";
                  }
                } else {
                  if (respuesta[0] == letterFromGuess) {
                    imageSrc = "/images/good-end-l.png";
                  } else if (respuesta[respuesta.length - 1] == letterFromGuess) {
                    imageSrc = "/images/good-end-r.png";
                  } else {
                    imageSrc = "/images/good-mid.png";
                  }
                }


              } else {
                if (respuesta[0] == letterFromGuess) {
                  imageSrc = "/images/meh-end-l.png";
                } else if (respuesta[respuesta.length - 1] == letterFromGuess) {
                  imageSrc = "/images/meh-end-r.png";
                } else {
                  imageSrc = "/images/meh-mid.png";
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
        </div >
        {guess.length > respuesta.length && (
          <div className="z-10 w-full max-w-5xl items-center justify-center font-mono sm:flex py-2">
            <FontAwesomeIcon icon={faMinus} color="red" />
            <p className="px-2">The answer has fewer letters</p>
          </div>
        )}
        {guess.length < respuesta.length && (
          <div className="z-10 w-full max-w-5xl items-center justify-center font-mono sm:flex py-2">
            <FontAwesomeIcon icon={faPlus} color="red" />
            <p className="px-2">The answer has more letters</p>
          </div>
        )}
        {guess.length === respuesta.length && guess != respuesta && (
          <div className="z-10 w-full max-w-5xl items-center justify-center font-mono sm:flex py-2">
            <FontAwesomeIcon icon={faEquals} color="yellow" />
            <p className="px-2">The answer has the same number of letters</p>
          </div>
        )}
        { guess === respuesta && (
          <div className="z-10 w-full max-w-5xl items-center justify-center font-mono sm:flex py-2">
          <FontAwesomeIcon icon={faCheck} color="green"/>
          <p className='px-2'>You got it!</p>
          </div>
        )}
          
        
      </div>

    ));
  };

  useEffect(() => {
    detectKeyDown.current = (e: KeyboardEvent) => {
      console.log("Clicked +", e.key);
      const isAlphabet = /^[a-zA-Z]$/.test(e.key);

      if (e.key === 'Enter') {
        const wordToCheck = typedWord.join('');
        setGuesses((prevGuess) => [...prevGuess, wordToCheck]);
        if (wordToCheck == respuesta) {
          setIsSolved(true);
        }
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
        {renderGuesses()}



      </div>



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


      <div>
        <div className="z-10 w-full max-w-5xl items-center justify-center font-mono   sm:flex">
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "Q"])}
          >
            Q
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "W"])}
          >
            W
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "E"])}
          >
            E
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "R"])}
          >
            R
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "T"])}
          >
            T
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "Y"])}
          >
            Y
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "U"])}
          >
            U
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "I"])}
          >
            I
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "O"])}
          >
            O
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "P"])}
          >
            P
          </Button>

        </div>
        <div className="z-10 w-full max-w-5xl items-center justify-center font-mono   sm:flex">
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "A"])}
          >
            A
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "S"])}
          >
            S
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "D"])}
          >
            D
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "F"])}
          >
            F
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "G"])}
          >
            G
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "H"])}
          >
            H
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "J"])}
          >
            J
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "K"])}
          >
            K
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "L"])}
          >
            L
          </Button>

        </div>
        <div className="z-10 w-full max-w-5xl items-center justify-center font-mono   sm:flex">
          <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
            ENTER
          </p>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "Z"])}
          >
            Z
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "X"])}
          >
            X
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "C"])}
          >
            C
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "V"])}
          >
            V
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "B"])}
          >
            B
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "N"])}
          >
            N
          </Button>
          <Button
            className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30"
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "M"])}
          >
            M
          </Button>
          <p className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit sm:static sm:w-auto  sm:rounded-xl sm:border sm:bg-gray-200 sm:p-4 sm:dark:bg-zinc-800/30">
            <FontAwesomeIcon icon={faDeleteLeft} />
          </p>
        </div>




      </div>



    </div>


  )
}
