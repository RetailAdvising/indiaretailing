import { check_Image } from "@/libs/api";
import ImageLoader from "../ImageLoader";

const Banner = ({ data, click_data , isMobile }) => {
  
  const backgroundImage = isMobile
    ? data.mobile_banner
      ? `${check_Image(data.mobile_banner.replace(/ /g, "%20"))}`
      : "/no-image.jpg"
    : data.banner_image
      ? `${check_Image(data.banner_image.replace(/ /g, "%20"))}`
      : "/no-image.jpg";
  
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        className={`lg:px-[15px] px-5 py-5 lg:py-10 flex flex-col bg-center bg-cover bg-no-repeat justify-start lg:min-h-[470px] md:min-h-[430px]`}
      >
        <div className="container mx-auto">
          {/* Brand Logos */}
          <div className="flex flex-row gap-3 lg:gap-8 items-start">
            {/* First logo */}
            {data.banner_logo_1 && (
              <div className="w-fit lg:w-auto">
                <ImageLoader
                  style="rounded-[5px] object-contain h-[60px] w-full lg:w-auto"
                  src={data.banner_logo_1}
                />
              </div>
            )}
            {/* Second logo */}
            {data.banner_logo_2 && (
              <div className="w-fit lg:w-auto">
                <ImageLoader
                  style="rounded-[5px] object-contain h-[60px] w-full lg:w-auto"
                  src={data.banner_logo_2}
                />
              </div>
            )}
          </div>

          {/* Banner Titles */}
          <div className="mt-3 lg:mt-2 text-left nunito">
            {data.banner_title && (
              <h1 style={{color: `${data.banner_title_color}`}} className="md:text-[20px] lg:text-5xl font-bold">
                {data.banner_title}
              </h1>
            )}
            {data.span_title && (
              <h1 style={{color: `${data.span_title_color}`}} className="md:text-[20px] lg:text-5xl font-bold mt-2">
                {data.span_title}
              </h1>
            )}
          </div>

          {/* Date */}
          {data.date && data.is_date_required === 1 && (
            <div className="mt-4 text-left">
              <span className="font-normal md:text-[18px] lg:text-[20px] text-white nunito">
                {data.date}
              </span>
            </div>
          )}

          {/* Button */}
          <div className="mt-6 text-left">
            <button
              onClick={() => click_data(data, "register")}
              className="w-fit text-[#CA4A56] bg-white font-bold uppercase px-4 py-2 rounded-3xl text-sm lg:text-base"
            >
              {data.button_name}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
