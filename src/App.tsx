import { useEffect, useState } from 'react';
import { HangImage } from './components/HangImage';
import { letters } from './helpers/letters';
import { getRandomWord } from './helpers/getRandomWord';

import './App.css';

function App() {

  const [ word, setWord ] = useState(getRandomWord());
  const [ hiddenWorld, setHiddenWord ] = useState('- '.repeat(word.length));
  const [ attempts, setAttempts ] = useState(0);
  const [ lose, setLose ] = useState(false);
  const [ won, setWon ] = useState(false);

  //Determina si perdió
  useEffect(() => {
    if(attempts >= 9){
      setLose(true);
    }

  }, [ attempts ]);

  useEffect(() => {

    const currentHiddenWord = hiddenWorld.split(' ').join('');
    if(currentHiddenWord === word){
      setWon(true);

    }

  }, [hiddenWorld]);

  const checkLetter = (letter: string) => {
    if(lose) return;
    if(won) return;

    if(!word.includes(letter)){
      setAttempts( Math.min( attempts +1, 9));
      return;
    } 

    const hiddenWorldArray = hiddenWorld.split(' ');

    for(let i = 0; i < word.length; i++){
      if(word[i] === letter){
        hiddenWorldArray[i] = letter;
      }
    }

    setHiddenWord( hiddenWorldArray.join(' '));
  }

  const newGame = () => {

    const newWord = getRandomWord();

    setWord( newWord );
    setHiddenWord( '_ '.repeat( newWord.length ));
    setAttempts( 0 );
    setLose( false );
    setWon( false );
  }

  return(
    <div className='App'>

    {/* Imágenes */}
    <HangImage imageNumber={ attempts }/>

    {/* Palabra oculta */}
    <h3>{ hiddenWorld }</h3>

    {/* Contador de Intentos */}
    <h3>Intentos: {attempts}</h3>

    {/* Mensaje si perdió */}
    {
      ( lose ) 
        ? <h2>Perdió: {word}</h2>
        : ''
    }

    {/* Mensaje si ganó */}
    {
      ( won ) 
        ? <h2>Felicidades, usted ganó!!!</h2>
        : ''
    }


    {/* Botones de Letra */}
    {
      letters.map( (letter) => (
        <button 
          onClick={ () => checkLetter(letter) }
          key={letter}>
            {letter}
        </button>
      ))
    }

    <br /><br />
    <button
      onClick={newGame}>
      ¿Quieres volver a Jugar?
    </button>


    </div>
  );

};

export default App;