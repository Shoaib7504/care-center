import Banner from "@/Components/Banner";
import CTA from "@/Components/CTA";
import Services from "@/Components/Services";
import Status from "@/Components/Status";
import Testimonials from "@/Components/Testimonials";
import WhyUs from "@/Components/WhyUs";

export const metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Care Center | Trusted Healthcare & Medical Services",
    description:
      "Book appointments, connect with experienced caregivers, and access quality home care services through Care Center.",
    url: "/",
  },
  twitter: {
    title: "Care Center | Trusted Healthcare Platform",
    description:
      "Find caregivers, book appointments, and access trusted home care services.",
  },
};

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
