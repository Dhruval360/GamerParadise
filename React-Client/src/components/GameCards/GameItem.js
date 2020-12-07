import React from 'react';
import { Link } from 'react-router-dom';

function GameItem(props) {
  return (
    <>
      <li className='games__item'>
        <a className='games__item__link' href={props.path}>
          <figure className='games__item__pic-wrap' data-category={props.label}>
            <img
              className='games__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='games__item__info'>
            <h5 className='games__item__text'>{props.text}</h5>
          </div>
        </a>
      </li>
    </>
  );
}

export default GameItem;