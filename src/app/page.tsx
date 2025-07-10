
import HomeBanner from "@/component/HomeBanner";
import HomeReview from "@/component/HomeReview";
import WhyChooseUs from "@/component/WhyChooseUs";
import FeaturedCategories from "./ourcatalog/page";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <FeaturedCategories/>
      <WhyChooseUs/>
      <HomeReview />
    </div>
  );
}
