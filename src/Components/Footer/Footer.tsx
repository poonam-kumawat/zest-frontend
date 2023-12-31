import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  if (pathname === "/profile") return null;
  return (
    <div className="footerWrap  py-10 mt-20 bg-[#F9F9F9]">
      <div className="md:grid md:grid-cols-3">
        <div className="fisrtCol">
          <h2 className="m-auto text-center text-[#4DBD7A] text-4xl font-bold">
            Zest
          </h2>
          <p className="text-center m-auto text-[#747875] mt-10">
            Copyright © 2023 Zest E-commerce
          </p>
          <p className="text-center m-auto text-[#747875] mt-10">
            Order your daily & fresh veggies easily & directly from the farms
          </p>
        </div>
        <div className="flex justify-between px-5 mt-10 md:mt-0 md:grid-cols-2">
          <div className="secondCol md:mx-auto md:my-0 grid">
            <div className="grid gap-1">
              <a href="/">Home</a>
              <a href="/">Delivery areas</a>
              <a href="/">Carreir</a>
              <a href="/">Press</a>
            </div>
          </div>
          <div className="thirdCol md:mx-auto md:my-0 grid">
            <div className="grid gap-1">
              <a href="/">Privacy Policy</a>
              <a href="/">Terms of use</a>
              <a href="/">Blogs</a>
              <a href="/">Aboutus</a>
            </div>
          </div>
        </div>
        <div className="forthCol grid text-center px-5 mt-10 md:mt-0">
          <div className="flex justify-between  md:grid">
            <div>
              <p>Contact us</p>
              <p>1800-313-3302</p>
            </div>
            <div>
              <p>Follow us</p>
              <div className="mt-3 md:px-24">
                <div className="flex justify-between space-x-4">
                  <img
                    className="h-8"
                    src="/assets/icons/facebook.svg"
                    alt="facebook"
                  />
                  <img
                    className="h-8"
                    src="/assets/icons/twitter.svg"
                    alt="facebook"
                  />
                  <img
                    className="h-8"
                    src="/assets/icons/instagram.svg"
                    alt="facebook"
                  />
                  <img
                    className="h-8"
                    src="/assets/icons/youtube.svg"
                    alt="facebook"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
