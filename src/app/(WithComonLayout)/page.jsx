import Banner from "@/Components/Banner";
import CTA from "@/Components/CTA";
import Services from "@/Components/Services";
import Status from "@/Components/Status";
import Testimonials from "@/Components/Testimonials";
import WhyUs from "@/Components/WhyUs";

export default function Home() {
  return (
    <div className="w-11/12 mx-auto">
      
      <Banner></Banner>
      <Services></Services>
      <WhyUs></WhyUs>
      <Status></Status>
      <Testimonials></Testimonials>
      <CTA></CTA>
    </div>
  );
}
