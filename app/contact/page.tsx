import { Footer } from '@/components/Footer';
import { ContactPageComponent } from '../../components/(contact)/contact-page';
import { Header } from '@/components/Header';

export default function About() {
    return (
        <div>
            <Header />
            <ContactPageComponent />
            <Footer />
        </div>
    )
}