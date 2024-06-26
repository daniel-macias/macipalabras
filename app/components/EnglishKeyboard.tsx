import React from 'react';
import Button from '@mui/base/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

type BackgroundColors = {
  [key: string]: string;
};

interface EnglishKeyboardProps {
  backgroundColors: BackgroundColors;
  setTypedWord: React.Dispatch<React.SetStateAction<string[]>>;
  enterPressed: () => void;
}

const EnglishKeyboard: React.FC<EnglishKeyboardProps> = ({ backgroundColors, setTypedWord, enterPressed }) => {
  const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const thirdRow = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'];

  const handleClick = (key: string) => {
    if (key === 'ENTER') {
      enterPressed();
    } else if (key === 'BACKSPACE') {
      setTypedWord((prevTypedWord) => prevTypedWord.slice(0, -1));
    } else {
      setTypedWord((prevTypedWord) => [...prevTypedWord, key]);
    }
  };

  const renderKey = (key: string) => (
    <Button
      key={key}
      className={`text-xl border-b border-gray-300 ${backgroundColors[key]} pb-2 pt-4 backdrop-blur-2xl dark:from-inherit static w-auto dark:border-neutral-800 rounded-xl border p-2 sm:p-4`}
      onClick={() => handleClick(key)}
    >
      {key === 'BACKSPACE' ? <FontAwesomeIcon icon={faDeleteLeft} /> : key}
    </Button>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="keyboard-row">{firstRow.map(renderKey)}</div>
      <div className="keyboard-row">{secondRow.map(renderKey)}</div>
      <div className="keyboard-row">{thirdRow.map(renderKey)}</div>
    </div>
  );
};

export default EnglishKeyboard;
