import React, { FC } from 'react'
import Card from '../Components/Card'

interface CardProps {
  id: number;
  name: string;
  availability: number,
  price: number
}
const data: Array<CardProps> = [
  {
    id: 1,
    name: "Fresh Pear - Indian",
    availability: 4,
    price: 40
  },
  {
    id: 2,
    name: "Fresh Apple - Indian",
    availability: 40,
    price: 140
  },
  {
    id: 3,
    name: "Fresh Mango - Indian",
    availability: 10,
    price: 40
  },
  {
    id: 4,
    name: "Fresh Orange - Indian",
    availability: 6,
    price: 90
  }
]

const HomePage: React.FC = () => {
  return (
    <div className='w-full h-full min-h-screen home'>
      <div className='w-full mt-4 relative flex flex-row justify-center items-center'>
        <img className='w-full h-full m-auto' src="/assets/images/homePage.svg" alt='home' />
        <div className='text-6xl text-[#1F2937] font-bold absolute top-52'>Fresh Food that deserve to eat</div>
        <div className='absolute text-xl text-[#1F2937]'>Get your healthy foods & snacks delivered at your doorsteps all day everyday</div>
        <div className='flex flex-row absolute w-[40%] bottom-52 p-2 bg-white rounded-md shadow-md border-1 border-[#1F2937]'>
          <img className='mx-3' src="/assets/icons/search-icon.svg" alt='search' height={20} width={20} />
          <input type='text' className='m-auto w-[100%] border-0 outline-none' placeholder='Search Vegetables and Fruits' />
          <button className='px-5 py-2 bg-[#4DBD7A] text-white rounded-lg'>Search</button>
        </div>
      </div>
      <section className='max-w-screen-2xl px-24 mx-auto'>
        <div className=''>
          <p className='text-xl my-4'>Fresh Fruits</p>
        </div>
        <div className='grid grid-cols-4 grid-rows-auto gap-6'>
          {
            data.map((cardData: CardProps) => {
              return (
                <Card key={cardData.id} cardData={cardData} />
              )
            })
          }
        </div>
      </section>
    </div>
  )
}

export default HomePage