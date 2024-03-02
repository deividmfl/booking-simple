export default function Gallery({ gallery }) {
  return (
    <>
      <div className="grid grid-cols-6 col-span-2 gap-2">
        {gallery.map((image) => (
          <div
            key={image.id}
            className={`overflow-hidden rounded-xl ${image.isCover ? "col-span-3 max-h-[20rem]" : "col-span-2 max-h-[15rem]"}`}
          >
            <img
              className="h-full w-full object-cover hover:brightness-50 hover:transition-all cursor-pointer"
              src={image.img}
              alt=""
            />
          </div>
        ))}
      </div>
    </>
  );
}
