

import { Banner } from './Banner/Banner';
import Faq from './FAQ/Faq';
import Knowus from './KnowUs/Knowus';
import Project from './Project/Project';
import Testimonial from './Review/Review';
import Team from './Team/Team';
import WeOffer from './WeOffer/WeOffer';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Knowus></Knowus>
            <WeOffer></WeOffer>
            <Faq></Faq>
            <Project></Project>
            <Team></Team>
            {/* <Testimonial></Testimonial> */}

           
            
        </div>
    );
};

export default Home;