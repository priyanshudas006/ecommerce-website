import React from "react";
import Titel from "../components/Titel";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Titel text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] "
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            We are a passionate team dedicated to delivering high-quality
            products and exceptional customer experiences. Our goal is to make
            online shopping simple, reliable, and enjoyable by offering
            carefully curated items that meet the highest standards of quality
            and design.
          </p>

          <p>
            Since our beginning, we have focused on innovation, transparency,
            and customer satisfaction. We believe in building long-term
            relationships with our users by providing excellent service, secure
            payments, and fast delivery, ensuring you can shop with confidence
            every time.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to provide high-quality products at fair prices while
            delivering a seamless and trustworthy shopping experience. We strive
            to continuously improve our services, embrace innovation, and put
            our customers at the center of everything we do.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Titel text1={"WHY"} text2={"CHOOSE US"} />
        <div className=" flex flex-col md:flex-row text-sm mb-20">
          <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance:</b>
            <p className="text-gray-600">
              We are committed to maintaining the highest standards of quality
              in every product we offer. Each item goes through strict quality
              checks to ensure durability, reliability, and customer
              satisfaction before it reaches you.
            </p>
          </div>
          <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Convenience:</b>
            <p className="text-gray-600">
              We focus on making your shopping experience smooth and
              hassle-free. From easy navigation and secure payments to quick
              checkout and reliable delivery, every step is designed to save you
              time and effort.
            </p>
          </div>
          <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Exceptional Customer Service:</b>
            <p className="text-gray-600">
              Our customers are our top priority. We are dedicated to providing
              friendly, responsive, and reliable support at every stage of your
              journey, ensuring your questions are answered and concerns are
              resolved quickly and effectively.
            </p>
          </div>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
