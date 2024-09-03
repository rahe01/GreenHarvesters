
import { Banner } from './Banner/Banner';
import Faq from './FAQ/Faq';
import Knowus from './KnowUs/Knowus';
import WeOffer from './WeOffer/WeOffer';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Knowus></Knowus>
            <WeOffer></WeOffer>
            <Faq></Faq>
        </div>
    );
};

export default Home;