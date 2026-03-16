import { ArrowLink, Breadcrumbs } from "@/components/common";
import ContactForm from "@/components/contactPageComponents/ContactForm";
import ContactInfoCard from "@/components/contactPageComponents/ContactInfoCard";
import { OurFeatures } from "@/components/homePageComponents";
import { CONTACT_INFO } from "@/constants";
import Image from "next/image";
import React from "react";

const page = () => {
  const paths = [
    { name: "home", path: "/" },
    { name: "Contact Us", path: "/contact_us" },
  ];
  return (
    <>
      <div className="container mb-20">
        <Breadcrumbs paths={paths} />
        <h3 className="text-2xl md:text-5xl font-medium my-6 md:w-3/5">
          We believe in sustainable decor. We’re passionate about life at home.
        </h3>
        <p className="md:w-3/5">
          Our features timeless furniture, with natural fabrics, curved lines,
          plenty of mirrors and classic design, which can be incorporated into
          any decor project. The pieces enchant for their sobriety, to last for
          generations, faithful to the shapes of each period, with a touch of
          the present
        </p>
        {/* about us section */}
        <div className="flex flex-col md:flex-row my-8">
          <div className="relative md:w-1/2 h-[532px]">
            <Image src={"/images/banner_1.jpeg"} alt="banner image" fill />
          </div>
          <div className=" md:w-1/2 p-8 bg-primary ps-6 md:ps-16 flex flex-col items-start justify-center gap-5">
            <h4 className="text-4xl font-medium">About Us</h4>
            <p className="text-xl">
              E-shop is a gift & decorations store based in HCMC, Vietnam. Est
              since 2019.
              <br />
              Our customer service is always prepared to support you 24/7
            </p>
            <ArrowLink href="/shop">shop now</ArrowLink>
          </div>
        </div>
        {/* contact us section */}
        <h2 className="text-center text-4xl font-medium">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-9 justify-center">
          {CONTACT_INFO.map((feature) => (
            <ContactInfoCard key={feature.title} {...feature} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactForm />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3065.977329508411!2d-89.65519035861422!3d39.785064141071075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x887539b00183934b%3A0xfc5bad3eac8d2a23!2s1464-1428%20S%202nd%20St%2C%20Springfield%2C%20IL%2062704%2C%20USA!5e0!3m2!1sen!2seg!4v1725988284590!5m2!1sen!2seg"
            className="w-full h-[400px] border-none"
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div className="bg-primary">
        <OurFeatures />
      </div>
    </>
  );
};

export default page;
