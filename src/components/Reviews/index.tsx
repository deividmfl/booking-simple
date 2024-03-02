import { StarIcon } from "../../utils/icons";
import Image from "next/image";
import style from "./style";

export default function Reviews({ reviews }) {
  return (
    <>
      {reviews.map((review) => (
        <div key={review.id} className={style.container}>
          <div className={style.flexColumn}>
            <div className="flex flex-row justify-between items-center">
              <div className="overflow-hidden rounded-full bg-slate-50">
                <Image
                  className="h-10 w-10 object-cover"
                  src={review.img}
                  width={76}
                  height={76}
                  alt="Reviwer image"
                />
              </div>
              <p className="font-semibold text-sm ml-3">{review.reviwerName}</p>
            </div>
            <div className="flex items-center justify-center space-x-2 pt-3">
              {[...Array(review.stars)].map((e, i) => (
                <StarIcon key={i} className="text-gray-900 w-2 h-2" />
              ))}
            </div>
          </div>
          <p className="text-sm font-light text-gray-900">{review.text}</p>
        </div>
      ))}
    </>
  );
}
