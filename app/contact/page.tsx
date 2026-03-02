import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { getContact } from '@/lib/strapi';
import '../homePage.css';

export default async function ContactPage() {
  const contactData = await getContact();
  return (
    <main className="home-page position-relative">
      <Header />
      <Contact
        displayEmail={contactData?.displayEmail}
        addressLine1={contactData?.addressLine1}
        addressLine2={contactData?.addressLine2}
      />
      <Footer />
    </main>
  );
}
