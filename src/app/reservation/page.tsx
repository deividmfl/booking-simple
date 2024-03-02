"use client";
import Gallery from "@/components/Gallery";
import { useAppStore } from "@/lib/store";
import { useEffect } from "react";
import FormBook from "@/components/FormBook";
import Description from "@/components/Description";
import Reviews from "@/components/Reviews";
import style from "./style";

export default function ReservationPage() {
  const { place, fetchPlace } = useAppStore();

  useEffect(() => {
    fetchPlace();
  }, [fetchPlace]);

  if (!place.id) return <>Loading...</>;

  return (
    <>
      <section className="bg-white xl:relative py-5">
        <div className="container max-w-screen-xl mx-auto">
          <div className="">
            <h1 className={style.title}>{place.title}</h1>
          </div>
          <div className="my-10">
            <Gallery gallery={place.gallery} />
          </div>
          <div className="flex flex-col xl:flex-row justify-between">
            <Description key={place.id} {...place} />
            <FormBook {...place} />
          </div>
        </div>
      </section>

      <section className="bg-white py-10 md:py-16">
        <div className="container max-w-screen-xl mx-auto px-4 xl:relative">
          <h1 className={style.aboutTitle}>
            What People Say <br /> About{" "}
            <span className="font-semibold">{place.title}</span>
          </h1>
          <div className={style.reviews}>
            <Reviews reviews={place.reviews} />
          </div>
        </div>
      </section>
    </>
  );
}
