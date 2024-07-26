import { getNameInitials } from '@/helpers/getNameInitials';
import { User } from 'next-auth';
import Image from 'next/image';

interface AvatarProps {
  user: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="p-3">
      {user.image ? (
        <Image
          src={user.image}
          width={42}
          height={42}
          alt="Photo"
          className="rounded-full"
        />
      ) : (
        <div className="size-[42px] rounded-full flex justify-center items-center bg-[#bc7ef1]">
          <strong className="text-white">{getNameInitials(user.name!)}</strong>
        </div>
      )}
    </div>
  );
};

export default Avatar;
