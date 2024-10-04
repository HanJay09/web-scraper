import { Footer } from '@/components/Footer';
import { PrivacyPolicyPageComponent } from '../../components/(policy)/privacy-policy-page';
import { Header } from '@/components/Header';

export default function About() {
    return (
        <div>
            <Header />
            <PrivacyPolicyPageComponent />
            <Footer />
        </div>
    )
}