import React, { FC } from 'react'
import Card from '../Components/Card'

interface CardProps {
  id: number;
  name: string;
  availability: number,
  price: 40
}
const data: any = [
  {
    id: 1,
    "name": "Fresh Pear - Indian",
    "availability": 4,
    "price": 40
  },
  {
    "id": 2,
    "name": "Fresh Apple - Indian",
    "availability": 40,
    "price": 140
  },
  {
    "id": 3,
    "name": "Fresh Mango - Indian",
    "availability": 10,
    "price": 40
  },
  {
    "id": 4,
    "name": "Fresh Orange - Indian",
    "availability": 6,
    "price": 90
  }
]

const HomePage: React.FC = () => {
  return (
    <div className='w-full h-full min-h-screen home'>
      <section className='max-w-screen-2xl px-24 mx-auto'>
        <div className=''>
          <p className='text-xl my-4'>Fresh Fruits</p>
        </div>
        <div className='grid grid-cols-4 grid-rows-auto gap-6'>
          {
            data.map((cardData: any) => {
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