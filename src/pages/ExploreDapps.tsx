/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { db } from '../firebase';
import { Link, useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import { getDocs, collection, addDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import FilterOptions from '../components/FilterOptions';

interface Item {
  id: number;
  title: string;
  category: string;
  cover: string;
  rating: number;
}

const ExploreDapps: FC = () => {
  const [dapps, setDapps] = useState([]);
  const [added, setAdded] = useState([]);
  const [addedIds, setAddedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const userEmail = searchParams.get('userEmail');

  const navigate = useNavigate();
  // Get All dApps from the dAppStore and the user's dApps
  const getDapps = async (): Promise<void> => {
    const dappsAval = await getDocs(collection(db, `Dapps`));
    // const userDappsAval = await getDocs(collection(db, `Users/${userEmail}/dapps`));
    const dapps: any[] = [];
    const userDapps: string[] = [];
    const userDappsIds: any[] = [];
    dappsAval.forEach((doc: any) => {
      dapps.push(doc.data());
    });
    // userDappsAval.forEach((doc: any) => {
    //   userDapps.push(doc.data().name);
    //   userDappsIds.push(doc.data());
    // });
    setAdded(userDapps);
    setDapps(dapps);
    setAddedIds(userDappsIds);
    const topDapp: any[] = [];
    for (let i = 0; i < 7; i++) {
      topDapp.push(dapps[i]);
    }
  };

  useEffect(() => {
    getDapps();
  }, [loading]);

  const [checkedValues, setCheckedValues] = useState<number[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [categoryInputValue, setCategoryInputValue] = useState<string>('');
  const [categorySort, setCategorySort] = useState<string>('');

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedValues((prevValues) => [...prevValues, parseInt(value, 10)]);
    } else {
      setCheckedValues((prevValues) => prevValues.filter((item) => item !== parseInt(value, 10)));
    }
  };

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchInputValue(e.target.value);
  };

  const handleCategoryInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCategoryInputValue(e.target.value);
  };

  const handleCategorySort = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCategorySort(e.target.value);
  };

  const handleNavigation = (dappInfo): void => {
    navigate({
      pathname: `/blur-profile/${dappInfo.docId}`,
      search: createSearchParams({
        userEmail: userEmail || '',
        dappInfo: encodeURIComponent(JSON.stringify(dappInfo))
      }).toString()
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clearAll = () => {
    setCheckedValues([]);
    setCategorySort('');
    setCategoryInputValue('');
    setSearchInputValue('');
  };

  return (
    <div className="container max-w-920 mx-auto px-4 py-9">
      <div className="flex gap-12 flex-col md:flex-row md:gap-5">
        {/* <FilterOptions
          handleSearchInput={handleSearchInput}
          handleCategoryInput={handleCategoryInput}
          handleCategorySort={handleCategorySort}
          handleCheckboxChange={handleCheckboxChange}
          checkedValues={checkedValues}
          searchInputValue={searchInputValue}
          categoryInputValue={categoryInputValue}
          categorySort={categorySort}
          clearAll={clearAll}
        /> */}
        <div className="max-w-640 w-full px-4  md:px-5 rounded-10">
          <div className="flex justify-between gap-2 flex-col items-center md:items-start md:flex-row mb-6">
            <h2 className="capitalize text-xl md:text-3xl">explore dapps</h2>
            <div className="flex items-center gap-1">
              <span>Sort by:</span>
              <select
                onChange={handleCategorySort}
                value={categorySort}
                className="outline-none bg-sortBy p-2 rounded-md cursor-pointer"
                name=""
                id=""
              >
                <option value="">Sort</option>
                <option value="top-rated">Top Rated</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
            {dapps.map((dapp) => {
              return (
                <div className="bg-white rounded-xl border-black border border-opacity-10" key={dapp.docId}>
                  <button onClick={() => handleNavigation(dapp)}>
                    <img
                      style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
                      src={dapp.logo}
                      alt={`${dapp.name}'s logo`}
                    />
                  </button>
                  <div className="px-4 pt-4 pb-7">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium">{dapp.name}</h2>
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
                        <p className="text-xs font-semibold">5</p>
                      </div>
                    </div>
                    <p className="text-yellow-color text-sm font-normal">{dapp.category}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreDapps;
