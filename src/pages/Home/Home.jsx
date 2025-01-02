import React from 'react';
import Banner from './Banner/Banner';
import Category from './category/Category';
import PopularMenu from './popularMenu/PopularMenu';
import Featured from './Featured/Featured';
import Testimonials from './testimonials/Testimonials';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div className=''>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
           <Banner></Banner>
           <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials>
           
        </div>
    );
};

export default Home;