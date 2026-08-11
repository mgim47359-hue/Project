import Header from './components/Header';
import Hero from './components/Hero';
import ModelShowcase from './components/ModelShowcase';
import RecruitmentInfo from './components/RecruitmentInfo';
import Categories from './components/Categories';
import Benefits from './components/Benefits';
import Process from './components/Process';
import PhotoGuide from './components/PhotoGuide';
import CTA from './components/CTA';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <ModelShowcase />
        <RecruitmentInfo />
        <Categories />
        <Benefits />
        <Process />
        <PhotoGuide />
        <CTA />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
