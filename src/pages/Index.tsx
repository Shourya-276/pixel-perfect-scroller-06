import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewlyLaunchedSection from "@/components/NewlyLaunchedSection";
import SpotlightProjectSection from "@/components/SpotlightProjectSection";
import TrendingProjectsSection from "@/components/TrendingProjectsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import VirtualTourSection from "@/components/VirtualTourSection";
import BanksSection from "@/components/BanksSection";
import BlogsAndArticlesSection from "@/components/BlogsAndArticlesSection";
import HomesInEveryZoneSection from "@/components/HomesInEveryZoneSection";
import FrequentlyAskedQuestionsSection from "@/components/FrequentlyAskedQuestionsSection";
import DiscoverNeighborhoodsSection from "@/components/DiscoverNeighborhoodsSection";
import MumbaiHomesSection from "@/components/MumbaiHomesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <NewlyLaunchedSection />
      <SpotlightProjectSection />
      <TrendingProjectsSection />
      <WhyChooseUsSection />
      <VirtualTourSection />
      <BanksSection />
      <BlogsAndArticlesSection />
      <HomesInEveryZoneSection />
      <FrequentlyAskedQuestionsSection />
      <DiscoverNeighborhoodsSection />
      <MumbaiHomesSection />
    </div>
  );
};

export default Index;