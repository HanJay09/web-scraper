import { Footer } from '@/components/Footer';
import { AboutUsPageComponent } from '../../components/(about)/about-us-page';
import { Header } from '@/components/Header';

export default function About() {
    return (
        <div>
            <Header />
            <AboutUsPageComponent />
            <Footer />
        </div>
    )
}