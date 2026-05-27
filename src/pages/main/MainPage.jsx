import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import URL from '@/constants/url';
import bannerImg from '@/assets/images/banner-image.png';
import { useRecommendationList } from '@/hooks/domain/recommendation/useRecommendationList';
import Main from '@/components/main/Main';
import MainRecommend from '@/components/main/MainRecommend';

function MainPage() {
  const { books, loading, handleViewBook } = useRecommendationList();

  return (
    <Main
      mainRecommend=
      {<MainRecommend
        books={books}
        loading={loading}
        handleViewBook={handleViewBook}
      />}
    />
  );
};

export default MainPage;
