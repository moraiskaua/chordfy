interface HeaderProps {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  hearts,
  percentage,
  hasActiveSubscription,
}) => {
  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      header
    </header>
  );
};
