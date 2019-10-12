import React from 'react';
import BlueTang from "./species/BlueTang";
import EmperorAngelfish from "./species/EmperorAngelfish";
import GreenChromis from "./species/GreenChromis";
import LyretailAnthias from "./species/LyretailAnthias";
import YellowTang from "./species/YellowTang";
import './Fish.scss'

const Empty = () => null;

const makeFishComponent = (Fish) => () => (<div className="fish">
  <Fish />
</div>)

const fish = [
  BlueTang,
  EmperorAngelfish,
  Empty,
  GreenChromis,
  LyretailAnthias,
  Empty,
  Empty,
  Empty,
  Empty,
  YellowTang
].map(makeFishComponent);

export default fish;
