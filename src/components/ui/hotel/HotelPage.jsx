import React from 'react';
import HotelSearch from './HotelSearch';
import PopularHotels from './PopularHotels';
import GrandInternet from './GrandInternet';
import Services from './Services';


export default function HotelPage() {
  return (
    <main className="bg-white">
      <HotelSearch />
      <PopularHotels />
      <GrandInternet />
      <Services />
    </main>
  );
}