"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faEquals } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { answers, allowed } from '../public/words';
import seedrandom from 'seedrandom';
import EnglishKeyboard from './components/EnglishKeyboard';

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
  

  const initialBackgroundColors: BackgroundColors = {} as BackgroundColors;
  const keys = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
  
  keys.forEach(key => {
    initialBackgroundColors[key as keyof BackgroundColors] = 'bg-gradient-to-b from-zinc-200';
  });

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
    <div className="min-h-screen w-full dark:bg-gray-900 bg-white dark:bg-dot-white/[0.1] bg-dot-black/[0.1] relative flex flex-col items-center justify-center overflow-auto">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-20 w-full max-w-5xl p-5">
        <div className="text-xl text-center font-mono border-b  pb-2 px-4 backdrop-blur-2xl dark:from-inherit w-fit mb-2 mx-auto">
          MaciWords
        </div>
        {guesses.length < 1 && typedWord.length < 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <p className="text-sm font-mono">With each guess, the shape of the letter will tell you its position</p>
            <Image
              src="/images/tutorialA.png"
              height={80}
              width={160}
              alt="Tutorial Part 1"
            />
            <p className="text-sm font-mono">The color tells you if the letter is in the word, and if you guessed the right amount</p>
            <Image
              src="/images/tutorialB.png"
              height={80}
              width={160}
              alt="Tutorial Part 1"
            />
            <p className="text-sm font-mono">Yellow means there is an &quot;A&quot;, but you guessed the wrong amount</p>
            <p className="text-sm font-mono">Blue means there is an &quot;A&quot;, and guessed the right amount</p>
            <p className="text-sm font-mono">Nothing means there is no &quot;A&quot; on the word</p>
            <p className="text-m font-mono py-2">New word every day!</p>
          </div>
        )}
        <div className="flex flex-col items-center">
          {renderGuesses()}
        </div>
        <div className="flex items-center justify-center">
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
        {isSolved && (
          <div className="text-center border-b border-gray-300 pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4 justify-center">
            <div className="text-xl">MaciWords</div>
            <div>{guesses.length} words used</div>
            <div>{guesses.join('').length} letters used</div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center w-full mt-4">
        <EnglishKeyboard
          backgroundColors={backgroundColors}
          setTypedWord={setTypedWord}
          enterPressed={enterPressed}
        />
      </div>
    </div>
  )
}
