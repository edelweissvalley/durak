import {useState} from 'react';
import deepMerge from '@75lb/deep-merge';
import {twMerge} from 'tailwind-merge';
import {create} from 'zustand';

import './tailwind.css';
import {clubs, diamonds, hearts, spades} from './constants';

const useStore = create((set) => ({
  update: (obj) => set((state) => Object.assign({}, deepMerge(state, obj))),
  clear: () => set({}),
}))

function Card({id, icon, color, text}) {
  const update = useStore((s) => s.update);
  const disabled = useStore((s) => s[id]?.disabled);

  return (
    <div
      style={{color}}
      onClick={() => {
        update({
          [id]: {
            disabled: !disabled,
          }
        });
      }}
      className={twMerge(`
        flex flex-col justify-between w-[42px] p-[5px] gap-2
        border-1 border-solid
        cursor-pointer select-none
      `, disabled && 'opacity-10')}
    >
      <div className="flex content-center leading-none">{text}</div>
      <div className="flex content-center justify-end">{icon}</div>
    </div>
  );
}

export function App() {
  const [quantity, setQuantity] = useState(9);
  const clear = useStore((s) => s.clear);

  return (
    <section className="flex justify-between content-center px-4 py-2 min-h-[100vh]">
      <div className="flex flex-col gap-5">
        <div>
          <input
            id="huey"
            value="9"
            type="radio"
            className="mr-2"
            checked={quantity === 9}
            onChange={(e) => setQuantity(Number(e.currentTarget.value))}
          />
          <label htmlFor="huey">36 карт</label>
        </div>
        <div>
          <input
            id="dewey"
            value="13"
            type="radio"
            className="mr-2"
            checked={quantity === 13}
            onChange={(e) => setQuantity(Number(e.currentTarget.value))}
          />
          <label htmlFor="dewey">52 карты</label>
        </div>
        <button className="text-orange-700" onClick={clear}>Сбросить</button>
      </div>
      <div className="flex gap-3 font-main">
        {[hearts, diamonds, clubs, spades].map((items) => (
          <div key={items.at(0).key} className="flex gap-2 flex-col">
            {
              items
                .slice(0, quantity)
                .map(({key, ...card}) => (<Card id={key} key={key} {...card} />))
            }
          </div>
        ))}
      </div>
    </section>
  );
}
