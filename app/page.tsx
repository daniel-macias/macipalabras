"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import Button from '@mui/base/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faEquals } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { answers, allowed } from '../public/words';
import seedrandom from 'seedrandom';

export default function Home() {
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    const now = new Date();
    const rng = seedrandom(
      (now.getDate() + now.getMonth() * 32 + now.getFullYear() * 400).toString()
    );

    const randomIndex = Math.floor(rng() * answers.length);

    setCorrectAnswer(answers[randomIndex].toUpperCase());
  }, []); 

  const detectKeyDown = useRef<((e: KeyboardEvent) => void) | null>(null);
  const [typedWord, setTypedWord] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState(false);

  type BackgroundColors = {
    [key: string]: string;
  };
  

  const initialBackgroundColors : BackgroundColors = {
    Q: 'bg-gradient-to-b from-zinc-200',
    W: 'bg-gradient-to-b from-zinc-200',
    E: 'bg-gradient-to-b from-zinc-200',
    R: 'bg-gradient-to-b from-zinc-200',
    T: 'bg-gradient-to-b from-zinc-200',
    Y: 'bg-gradient-to-b from-zinc-200',
    U: 'bg-gradient-to-b from-zinc-200',
    I: 'bg-gradient-to-b from-zinc-200',
    O: 'bg-gradient-to-b from-zinc-200',
    P: 'bg-gradient-to-b from-zinc-200',
    A: 'bg-gradient-to-b from-zinc-200',
    S: 'bg-gradient-to-b from-zinc-200',
    D: 'bg-gradient-to-b from-zinc-200',
    F: 'bg-gradient-to-b from-zinc-200',
    G: 'bg-gradient-to-b from-zinc-200',
    H: 'bg-gradient-to-b from-zinc-200',
    J: 'bg-gradient-to-b from-zinc-200',
    K: 'bg-gradient-to-b from-zinc-200',
    L: 'bg-gradient-to-b from-zinc-200',
    Z: 'bg-gradient-to-b from-zinc-200',
    X: 'bg-gradient-to-b from-zinc-200',
    C: 'bg-gradient-to-b from-zinc-200',
    V: 'bg-gradient-to-b from-zinc-200',
    B: 'bg-gradient-to-b from-zinc-200',
    N: 'bg-gradient-to-b from-zinc-200',
    M: 'bg-gradient-to-b from-zinc-200'
  };

  const [backgroundColors, setBackgroundColors] = useState(initialBackgroundColors);

  const changeKeyboardColors = (letterAmountGuesses: Map<string, number>, letterAmountAnswer: Map<string, number>) => {
    const updatedBackgroundColors = backgroundColors;
    console.log(letterAmountAnswer);
    console.log(letterAmountGuesses);
  
    letterAmountGuesses.forEach((value, key) => {
      if (letterAmountAnswer.has(key)) {
        if (letterAmountAnswer.get(key) === letterAmountGuesses.get(key)) {
          // paint correct
          updatedBackgroundColors[key] = 'bg-blue-500';
        } else {
          // paint exists
          updatedBackgroundColors[key] = 'bg-yellow-500';
        }
      } else {
        // paint absent
        updatedBackgroundColors[key] = 'bg-zinc-500';
      }
    });
  
    setBackgroundColors(updatedBackgroundColors);
  };

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

    let answerLetterAmount = getLetterAmount(correctAnswer);


    return guesses.map((guess, index) => (
      <div>
        <div key={index} className="z-10 w-full max-w-5xl items-center justify-center font-mono flex py-2">
          {Array.from(guess).map((letterFromGuess, indexLetter) => {
            let imageSrc;

            if (correctAnswer.includes(letterFromGuess)) {

              let guessLetterAmount = getLetterAmount(guess);
              let isCorrectSolution = correctAnswer == guess ? true : false;

              if (answerLetterAmount.get(letterFromGuess) == guessLetterAmount.get(letterFromGuess)) {

                if (isCorrectSolution) {
                  if (correctAnswer[0] == letterFromGuess) {
                    imageSrc = "/images/complete-l.png";
                  } else if (correctAnswer[correctAnswer.length - 1] == letterFromGuess) {
                    imageSrc = "/images/complete-r.png";
                  } else {
                    imageSrc = "/images/complete-mid.png";
                  }
                } else {
                  if (correctAnswer[0] == letterFromGuess) {
                    imageSrc = "/images/good-end-l.png";
                  } else if (correctAnswer[correctAnswer.length - 1] == letterFromGuess) {
                    imageSrc = "/images/good-end-r.png";
                  } else {
                    imageSrc = "/images/good-mid.png";
                  }
                }


              } else {
                if (correctAnswer[0] == letterFromGuess) {
                  imageSrc = "/images/meh-end-l.png";
                } else if (correctAnswer[correctAnswer.length - 1] == letterFromGuess) {
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
        {guess.length > correctAnswer.length && (
          <div className="z-10 w-full max-w-5xl items-center justify-center font-mono flex py-2">
            <FontAwesomeIcon icon={faMinus} color="red" />
            <p className="px-2">The answer has fewer letters</p>
          </div>
        )}
        {guess.length < correctAnswer.length && (
          <div className="z-10 w-full max-w-5xl items-center justify-center font-mono flex py-2">
            <FontAwesomeIcon icon={faPlus} color="red" />
            <p className="px-2">The answer has more letters</p>
          </div>
        )}
        {guess.length === correctAnswer.length && guess != correctAnswer && (
          <div className="z-10 w-full max-w-5xl items-center justify-center font-mono flex py-2">
            <FontAwesomeIcon icon={faEquals} color="yellow" />
            <p className="px-2">The answer has the same number of letters</p>
          </div>
        )}
        { guess === correctAnswer && (
          <div className="z-10 w-full max-w-5xl items-center justify-center font-mono flex py-2">
          <FontAwesomeIcon icon={faCheck} color="green"/>
          <p className='px-2'>You got it!</p>
          </div>
        )}
          
        
      </div>

    ));
  };

  const enterPressed = () => {
    if(!isSolved){
      const wordToCheck = typedWord.join('');
      setGuesses((prevGuess) => [...prevGuess, wordToCheck]);
      changeKeyboardColors(getLetterAmount(wordToCheck),getLetterAmount(correctAnswer));
      if (wordToCheck == correctAnswer) {
        setIsSolved(true);
      }
      setTypedWord([]);
    }
    
    
  };

  useEffect(() => {
    detectKeyDown.current = (e: KeyboardEvent) => {
      console.log("Clicked +", e.key);
      const isAlphabet = /^[a-zA-Z]$/.test(e.key);

      if (e.key === 'Enter') {
        enterPressed();
      } else if (e.key === 'Backspace') {
        setTypedWord((prevTypedWord) => prevTypedWord.slice(0, -1));
      } else if (isAlphabet && !isSolved) {
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
      <div className="text-xl text-center border-b border-gray-300 pb-5 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4 justify-center">
            MaciWords

      </div>
      <div>
        {renderGuesses()}
      </div>



      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono flex">
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
        {isSolved && (
          <div className="text-center border-b border-gray-300 pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4 justify-center">
            <div className="text-xl">MaciWords</div>
            <div>{guesses.length} words used</div>
            <div>{guesses.join('').length} letters used</div>
            
          </div>
        )}
      </div>

      <div>
        <div className="z-10 w-full max-w-5xl items-center justify-center font-mono pt-5  flex">
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['Q']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "Q"])}
          >
            Q
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['W']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "W"])}
          >
            W
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['E']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "E"])}
          >
            E
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['R']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "R"])}
          >
            R
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['T']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "T"])}
          >
            T
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['Y']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "Y"])}
          >
            Y
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['U']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "U"])}
          >
            U
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['I']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "I"])}
          >
            I
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['O']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "O"])}
          >
            O
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['P']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "P"])}
          >
            P
          </Button>

        </div>
        <div className="z-10 w-full max-w-5xl items-center justify-center font-mono flex">
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['A']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "A"])}
          >
            A
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['S']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "S"])}
          >
            S
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['D']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "D"])}
          >
            D
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['F']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "F"])}
          >
            F
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['G']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "G"])}
          >
            G
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['H']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "H"])}
          >
            H
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['J']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "J"])}
          >
            J
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['K']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "K"])}
          >
            K
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['L']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "L"])}
          >
            L
          </Button>

        </div>
        <div className="z-10 w-full max-w-5xl items-center justify-center font-mono  flex">
          <Button
          className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit static w-auto   rounded-xl border sm:bg-gray-200 p-2 sm:p-4 sm:dark:bg-zinc-800/30"
          onClick={enterPressed}>
            ENTER
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['Z']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800  rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "Z"])}
          >
            Z
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['X']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800  rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "X"])}
          >
            X
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['C']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800  rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "C"])}
          >
            C
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['V']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800  rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "V"])}
          >
            V
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['B']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800  rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "B"])}
          >
            B
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['N']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800  rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "N"])}
          >
            N
          </Button>
          <Button
            className={`text-xl border-b border-gray-300 ${backgroundColors['M']} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800  rounded-xl border p-2 sm:p-4`}
            onClick={() => setTypedWord((prevTypedWord) => [...prevTypedWord, "M"])}
          >
            M
          </Button>
          <Button
          className="text-xl border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit static w-auto   rounded-xl border sm:bg-gray-200 p-2 sm:p-4 sm:dark:bg-zinc-800/30"
          onClick={() => setTypedWord((prevTypedWord) => prevTypedWord.slice(0, -1))}>
            <FontAwesomeIcon icon={faDeleteLeft} />
          </Button>
        </div>




      </div>


    </div>


  )
}
