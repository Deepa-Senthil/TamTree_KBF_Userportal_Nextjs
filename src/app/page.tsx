
import HomeBanner from "@/component/HomeBanner";
import HomeReview from "@/component/HomeReview";
import OurCollections from "@/component/OurCollections";
import WhyChooseUs from "@/component/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <HomeBanner/>
      <OurCollections />
      <WhyChooseUs/>
      <HomeReview />
    </div>
  );
}
