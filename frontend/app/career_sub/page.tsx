import CareerDetails from '@/components/Career/CareerDetails';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import '../homePage.css';


const page = () => {
  return (
    <main className="home-page position-relative">
      <Header />
      <CareerDetails />
      <WantToKnowMore />
      <Footer />
    </main>
  )
}

export default page