import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Item {
  id: number;
  title: string;
  category: string;
  cover: string;
  rating: number;
}

// eslint-disable-next-line react/function-component-definition
const Home: FC = () => {
  // profile item list

  const navigate = useNavigate();
  const items: Item[] = [
    {
      id: 1,
      title: 'Blurr.p',
      category: 'Category Goes Here',
      cover: '/images/dapp1.png',
      rating: 4.9
    },
    {
      id: 2,
      title: 'Blurr.p',
      category: 'Category Goes Here',
      cover: '/images/dapp2.png',
      rating: 4.9
    },
    {
      id: 3,
      title: 'Blurr.p',
      category: 'Category Goes Here',
      cover: '/images/dapp3.png',
      rating: 4.9
    },
    {
      id: 4,
      title: 'Blurr.p',
      category: 'Category Goes Here',
      cover: '/images/dapp4.png',
      rating: 4.9
    },
    {
      id: 5,
      title: 'Blurr.p',
      category: 'Category Goes Here',
      cover: '/images/dapp5.png',
      rating: 4.9
    },
    {
      id: 6,
      title: 'Blurr.p',
      category: 'Category Goes Here',
      cover: '/images/dapp6.png',
      rating: 4.9
    },
    {
      id: 7,
      title: 'Blurr.p',
      category: 'Category Goes Here',
      cover: '/images/dapp7.png',
      rating: 4.9
    },
    {
      id: 8,
      title: 'Blurr.p',
      category: 'Category Goes Here',
      cover: '/images/dapp8.png',
      rating: 4.9
    },
    {
      id: 9,
      title: 'Blurr.p',
      category: 'Category Goes Here',
      cover: '/images/dapp9.png',
      rating: 4.9
    },
    {
      id: 10,
      title: 'Blurr.p',
      category: 'Category Goes Here',
      cover: '/images/dapp10.png',
      rating: 4.9
    }
  ];

  const handleNavigation = (): void => {
    console.log('Im clicking');
    navigate('/explore-dapps'); // Redirect to login page on successful registration
  };

  return (
    <div className="container max-w-1172 mx-auto px-4 pb-12">
      <div className="border-[1.5px] outline-dashed outline-yellow-color rounded-14 bg-yellow-color bg-opacity-10 w-[282px] h-[198px] px-6 py-7 mt-12 flex flex-col items-center text-center mx-auto sm:ml-0">
        <button onClick={handleNavigation}>
          <img src="/images/plus.png" alt="plus" />
        </button>
        <h1 className="text-primary-color text-xl md:text-2xl font-medium capitalize">Welcome, Josh</h1>
        <p className="text-primary-color opacity-60 text-base font-medium capitalize">
          nothing yet, click the plus icon to get start with dapphub
        </p>
      </div>
      <section>
        <h2 className="text-primary-color text-xl md:text-2xl font-medium capitalize mt-12 mb-6">Suggested dapps</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {items.map((item: Item) => {
            return (
              <div className="bg-white rounded-xl border-black border border-opacity-10" key={item.id}>
                <Link to={`/blur-profile/${item.id}`}>
                  <img className="w-full" src={item.cover} alt="black-jack" />
                </Link>
                <div className="px-4 pt-4 pb-7">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">{item.title}</h2>
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M6.99996 1.16667L8.80246 4.81834L12.8333 5.40751L9.91663 8.24834L10.605 12.2617L6.99996 10.3658L3.39496 12.2617L4.08329 8.24834L1.16663 5.40751L5.19746 4.81834L6.99996 1.16667Z"
                          fill="#EFAC00"
                          stroke="#DB980A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-xs font-semibold">{item.rating}</p>
                    </div>
                  </div>
                  <p className="text-yellow-color text-sm font-normal">{item.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
