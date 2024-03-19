import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../context/AppContext';

interface Item {
  id: string | number;
  title: string;
  description: string;
  launched: boolean;
  launchedAt: string;
  avatar: string;
}

// eslint-disable-next-line react/function-component-definition
const Profile: FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      title: 'Okx',
      description: 'Nunc dolor massa, facilisis sit amet blandit lorem ipsum',
      launched: true,
      launchedAt: '2h ago',
      avatar: '/images/okx.png'
    },
    {
      id: 2,
      title: 'PancakeSwap',
      description: 'Nunc dolor massa, facilisis sit amet blandit lorem ipsum',
      launched: false,
      launchedAt: '',
      avatar: '/images/pancake_swap.png'
    }
  ]);

  const [show, setShow] = useState<string | number>('');

  // delete handler for the listed home
  const handleDelete = (id: string | number): void => {
    setItems((prev) => prev.filter((list) => list.id !== id));
    setShow('');
  };

  // home list show handler
  const handleShow = (id: string | number): void => {
    if (id === show) {
      setShow('');
    } else {
      setShow(id);
    }
  };

  // add home to the list
  useEffect(() => {
    // setProfileList([{ name: 'Okx', linkTo: '/home' }]);
  }, []);

  return (
    <section className="container max-w-1440 mx-auto px-4">
      <h2 className="text-2xl font-semibold mt-10">
        <b>Dashboard Overview</b>
      </h2>
      <div className="flex flex-row gap-3.5 mt-7 flex-wrap">
        <div className="flex w-[203px] h-[267px] py-6 px-5 flex-col justify-center items-center gap-5 shrink-0 rounded-xl border border-dashed border-yellow-color bg-[#efac000f]">
          <div className="bg-yellow-color w-9 h-9 rounded-full flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
              <path d="M4.25 9H14.75" stroke="#252B21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.5 3.75V14.25" stroke="#252B21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-base md:text-lg font-medium text-center capitalize">Add More</h2>
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className=" w-full sm:w-[250px] h-[267px] p-5 flex-col justify-between shrink-0 rounded-xl bg-white"
          >
            <div>
              <div className="flex justify-between relative">
                <img src={item.avatar} alt="pancake_swap" />
                <svg
                  onClick={() => handleShow(item.id)}
                  className="cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9.99984 10.8333C10.4601 10.8333 10.8332 10.4602 10.8332 9.99999C10.8332 9.53975 10.4601 9.16666 9.99984 9.16666C9.5396 9.16666 9.1665 9.53975 9.1665 9.99999C9.1665 10.4602 9.5396 10.8333 9.99984 10.8333Z"
                    fill="#767676"
                    stroke="#767676"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.99984 5.00001C10.4601 5.00001 10.8332 4.62691 10.8332 4.16668C10.8332 3.70644 10.4601 3.33334 9.99984 3.33334C9.5396 3.33334 9.1665 3.70644 9.1665 4.16668C9.1665 4.62691 9.5396 5.00001 9.99984 5.00001Z"
                    fill="#767676"
                    stroke="#767676"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.99984 16.6667C10.4601 16.6667 10.8332 16.2936 10.8332 15.8333C10.8332 15.3731 10.4601 15 9.99984 15C9.5396 15 9.1665 15.3731 9.1665 15.8333C9.1665 16.2936 9.5396 16.6667 9.99984 16.6667Z"
                    fill="#767676"
                    stroke="#767676"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <button
                  onClick={() => handleDelete(item.id)}
                  className={`absolute top-6 bg-white shadow-sm border rounded-sm right-0 border-b p-2 cursor-pointer ${
                    show === item.id ? '' : 'hidden'
                  }`}
                >
                  Delete
                </button>
              </div>
              <div>
                <div className="flex gap-2 mt-4 items-center">
                  <h2 className="text-lg font-medium">{item.title}</h2>
                  {/* {item.launched ? null : (
                    <p className="h-5 px-2 py-1.5 rounded-full bg-secondary-color bg-opacity-20 text-opacity-20 text-xs font-normal flex items-center">
                      Unlatched
                    </p>
                  )} */}
                </div>
                <p className="opacity-60 text-xs md:text-sm font-medium mt-3">{item.description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3.5">
              <div className="flex justify-between items-center">
                <h2 className="text-secondary-color text-sm  font-normal capitalize">Last launched</h2>
                <p className="text-offColor text-sm  font-medium capitalize">{item.launchedAt}</p>
              </div>
              {item.launched ? (
                <button className="h-8 w-full rounded-lg border border-primary-color text-xs md:text-sm font-normal">
                  Resume
                </button>
              ) : (
                <button className="h-8 w-full rounded-lg bg-yellow-color text-xs md:text-sm font-normal">Launch</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profile;
