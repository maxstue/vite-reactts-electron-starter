import React, { FC } from 'react';
import Reviews from '../components/Reviews';
import PreviewImages from '../components/PreviewImages';
import ProfileTop from '../components/ProfileTop';
import { useSearchParams } from 'react-router-dom';

// eslint-disable-next-line react/function-component-definition
const BlurProfile: FC = () => {
  const [searchParams] = useSearchParams();
  const userEmail = searchParams.get('userEmail');
  const decodedDappInfo = decodeURIComponent(searchParams.get('dappInfo'));
  const dappInfo = JSON.parse(decodedDappInfo);
  return (
    <div className="max-w-640 mx-auto px-4 pt-12">
      <ProfileTop dappInfo={dappInfo} userEmail={userEmail} />
      {/* <PreviewImages />
      <Reviews /> */}
    </div>
  );
};

export default BlurProfile;
