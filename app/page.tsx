import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsSearch from "@/components/StatsSearch";
import Segments from "@/components/Segments";
import WhyUs from "@/components/WhyUs";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import SocialFeeds from "@/components/SocialFeeds";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-grid opacity-40"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[100px]"></div>
      </div>

      <Header />
      <Hero />
      <StatsSearch />
      <Segments />
      <WhyUs />
      <Blogs />
      <Contact />
      <SocialFeeds />
      <Partners />
      <Footer />
    </main>
  );
}

