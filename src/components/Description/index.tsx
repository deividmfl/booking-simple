import React, { type ReactElement } from "react";
import Card from "@/components/Card";
import { type Place } from "@/lib/slices/createPlace";
import style from "./style";

export default function Description(place: Place): ReactElement {
  const PropertyInfo = (): ReactElement => (
    <ol className="flex flex-row font-normal text-gray-500 text-md md:text-sm text-left">
      <li className="mr-1">{`${place.property.guests} guests -`}</li>
      <li className="mr-1">{`${place.property.bedrooms}bedrooms -`}</li>
      <li className="mr-1">{`${place.property.beds} beds -`}</li>
      <li className="mr-1">{`${place.property.bathroom} bath`}</li>
    </ol>
  );

  return (
    <div className="basis-1/2">
      <div className="mb-10">
        <div>
          <h1 className={style.title}>
            {`${place.roomTypeTitle} in ${place.city}, ${place.country}`}
          </h1>
        </div>
        <div>
          <PropertyInfo />
        </div>
      </div>

      <div className="border-y border-y-gray-300">
        {/* amenities */}
        <div className="flex flex-col items-start py-8">
          {place.amenities.map((amenitie) => (
            <Card
              key={amenitie.id}
              icon={amenitie.icon}
              text={amenitie.title}
              subtext={amenitie.subtext}
            />
          ))}
        </div>
      </div>
      <div className="py-8 border-y">
        <h1 className={style.about}>About this place</h1>
        <p className="whitespace-pre-line text-sm">{place.description}</p>
      </div>
    </div>
  );
}
