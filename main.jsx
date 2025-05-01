import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import './tailwind.css';
import {clubs, diamonds, hearts, spades} from './constants';

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);

function Card({icon, color, text}) {
  return (
    <div
      className={`
        flex flex-col justify-between w-[42px] p-[5px] gap-2
        border-1 border-solid
        cursor-pointer select-none
      `}
      style={{color}}
    >
      <div className="flex content-center leading-none">{text}</div>
      <div className="flex content-center justify-end">{icon}</div>
    </div>
  );
}

function App() {
  return (
    <section className="flex justify-between content-center px-4 py-2 min-h-[100vh]">
      <div>
        <div>
          <input type="radio" id="huey" name="drone" value="huey" checked />
          <label htmlFor="huey">36 карт</label>
        </div>
        <div>
          <input type="radio" id="dewey" name="drone" value="dewey" />
          <label htmlFor="dewey">52 карты</label>
        </div>
        <button className="text-orange-700">Сбросить</button>
      </div>
      <div className="flex gap-3 font-main">
        <div className="flex gap-2 flex-col">{hearts.map(({key, ...card}) => (<Card key={key} {...card} />))}</div>
        <div className="flex gap-2 flex-col">{diamonds.map(({key, ...card}) => (<Card key={key} {...card} />))}</div>
        <div className="flex gap-2 flex-col">{clubs.map(({key, ...card}) => (<Card key={key} {...card} />))}</div>
        <div className="flex gap-2 flex-col">{spades.map(({key, ...card}) => (<Card key={key} {...card} />))}</div>
      </div>
    </section>
  );
}
