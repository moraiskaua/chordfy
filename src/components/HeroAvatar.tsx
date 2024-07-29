import Image from 'next/image';

export const HeroAvatar = () => {
  return (
    <div className="pt-8 pl-4 pb-7 flex items-center gap-x-2">
      <Image src="/icons/logo.png" width={50} height={50} alt="Logo" />
      <h1 className="text-2xl font-extrabold tracking-wide text-[#bc7ef1]">
        Chordfy
      </h1>
    </div>
  );
};
