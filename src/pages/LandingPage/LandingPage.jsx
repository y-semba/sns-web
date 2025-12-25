import React from 'react';
// 各セクションのコンポーネントをインポート
import Header from '../../components/00_Header/Header';
import Hero from '../../components/01_Hero/Hero.jsx';
import Problem from '../../components/02_Problem/Problem.jsx';
import Solution from '../../components/03_Solution/Solution.jsx';
import Merit from '../../components/04_Merit/Merit.jsx';
import Features from '../../components/05_Features/Features.jsx';
import Target from '../../components/06_Target/Target.jsx';
import Flow from '../../components/07_Flow/Flow.jsx';
import CTA from '../../components/08_CTA/CTA.jsx';
import DemoSNS from '../../components/09_DemoSNS/DemoSNS.jsx';
import Footer from '../../components/99_Footer/Footer.jsx';

const LandingPage = () => {
  return (
    <main>
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Merit />
      {/* <Features /> */}
      <DemoSNS />
      {/* <Target /> */}
      {/* <Flow /> */}
      {/* <CTA /> */}
      <Footer />
    </main>
  );
};

export default LandingPage;