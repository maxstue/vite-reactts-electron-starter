import React, { FC } from 'react';
import Reviews from '../components/Reviews';
import PreviewImages from '../components/PreviewImages';
import ProfileTop from '../components/ProfileTop';

// eslint-disable-next-line react/function-component-definition
const BlurProfile: FC = () => {
  return (
    <div className="max-w-640 mx-auto px-4 pt-12">
      <ProfileTop />
      <PreviewImages />
      <Reviews />
    </div>
  );
};

export default BlurProfile;
