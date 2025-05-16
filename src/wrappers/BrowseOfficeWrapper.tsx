import { useEffect, useState } from "react";
import OfficeCard from "../components/OfficeCard"
import {  Office } from "../types/type";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
export default function BrowseOfficeSpaceWrappers() {
   const [offices, setoffice] = useState<Office[]>([]);
  
    const [loading, setLoading] = useState(true);
  
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      axios
        .get("http://127.0.0.1:8000/api/offices", {
          headers: {
            "X-API-KEY": "asdsad2313xsdda",
          },
        })
        .then((response) => {
          setoffice(response.data.data);
          console.log("API Response:", response.data.data); // Debugging
          setLoading(false);
        })
        .catch((error) => {
          console.error("API Error:", error);
          setError(error.message);
          setLoading(false);
        })
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  return (
  <section
       id="Fresh-Space"
       className="flex flex-col gap-[30px] w-full max-w-[1130px] mx-auto mt-[100px] mb-[120px]"
     >
       <h2 className="font-bold text-[32px] leading-[48px] text-nowrap text-center">
         Browse Our Fresh Space.
         <br />
         For Your Better Productivity.
       </h2>
       <div className="grid grid-cols-3 gap-[30px]">
       <Swiper
            direction="horizontal"
            spaceBetween={30}
            slidesPerView="auto"
            slidesOffsetAfter={30}
            slidesOffsetBefore={30}
            >
            {offices.map((office) => (
              <SwiperSlide key={office.id} className="!w-fit first-of-type:pl-[calc((100%-1130px-60px)/2)] last-of-type:pr-[calc((100%-1130px-60px)/2)]">
                <Link to={`/office/${encodeURIComponent(office.slug)}`}>

                <OfficeCard office={office}></OfficeCard>
                </Link>
              </SwiperSlide> 
            ))}
          </Swiper>
       </div>
     </section>
  )
}
