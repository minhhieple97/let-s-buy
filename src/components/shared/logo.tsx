import { FC } from 'react';
import Image from 'next/image';
import LogoImg from '../../../public/assets/icons/logo-1.png';

type LogoProps = {
  width: string;
  height: string;
};

const Logo: FC<LogoProps> = ({ width, height }) => {
  return (
    <div className="z-50" style={{ width: width, height: height }}>
      <Image src={LogoImg} alt="Let's Buy" className="w-full h-full object-contain" />
    </div>
  );
};

export default Logo;
