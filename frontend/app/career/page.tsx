import Hero from '@/components/Career/Hero';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import WhatWeDo from '@/components/VaultInvestment/WhatWeDo';
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore';
import '../homePage.css';

const whatWeDoTitle = "Find Opportunities";
const whatWeDoItems = [
  {
    title: "Empowerment & Growth",
    link: "/career_sub",
    careerTerms: [
      { label: "Remote" },
      { label: "Full Time" },
      { label: "Kyiv, Ukraine" }
    ]
  },
  {
    title: "Inclusive Culture",
    link: "/career_sub",
    careerTerms: [
      { label: "Remote" },
      { label: "Full Time" },
      { label: "Kyiv, Ukraine" }
    ]
  },
  {
    title: "Continuous Learning",
    link: "/career_sub",
    careerTerms: [
      { label: "Remote" },
      { label: "Full Time" },
      { label: "Kyiv, Ukraine" }
    ]
  },
];

const page = () => {
  return (
    <main className="home-page position-relative">
      <Header />
      <Hero />
      <WhatWeDo
        whatWeDoTitle={whatWeDoTitle}
        whatWeDoItems={whatWeDoItems}
        careerTitle="Open Positions"
        careerTerms={[
          { label: "Remote" },
          { label: "Full Time" },
          { label: "Kyiv, Ukraine" }
        ]}
      />
      <WantToKnowMore />
      <Footer />
    </main>
  )
}

export default page