import image from "@images/me.jpeg";
import { tw } from "@utils/tailwind";
import Image from "next/image";

const LeftSide = () => {
  return (
    <div className="md:col-span-4">
      <Image
        src={image}
        alt="Gobind Singh, full stack developer based in Punjab, India"
        priority
        loading="eager"
        className={tw`
          aspect-4/5 h-auto
          w-full
          object-cover
        `}
      />
    </div>
  );
};

export default LeftSide;
