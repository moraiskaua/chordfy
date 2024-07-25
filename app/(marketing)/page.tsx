import { Button } from '@/components/ui/Button';
import Image from 'next/image';

const Home = () => {
  const signedIn = false;

  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/hero.png" fill alt="Hero" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Listen and learn music with Chordfy.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          {signedIn ? (
            <Button size="lg" variant="default" className="w-full">
              Continue learning
            </Button>
          ) : (
            <>
              <Button size="lg" variant="default" className="w-full">
                Get started
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                I already have an account
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
