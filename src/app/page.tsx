
import HomeBanner from "@/component/HomeBanner";
import HomeReview from "@/component/HomeReview";
import WhyChooseUs from "@/component/WhyChooseUs";
import FeaturedCategories from "./ourcatalog/page";
import HomeMarquee from "@/component/HomeMarquee";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <HomeMarquee/>
      <FeaturedCategories/>
      <WhyChooseUs/>
      <HomeReview />
    </div>
  );
}
