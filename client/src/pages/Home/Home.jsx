

import { Banner } from './Banner/Banner';
import Faq from './FAQ/Faq';
import Knowus from './KnowUs/Knowus';
import Project from './Project/Project';
import WeOffer from './WeOffer/WeOffer';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Knowus></Knowus>
            <WeOffer></WeOffer>
            <Faq></Faq>
            <Project></Project>
            
        </div>
    );
};

export default Home;