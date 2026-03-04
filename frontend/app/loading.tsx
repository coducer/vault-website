import Image from 'next/image';
import logo from '@/public/assests/Logo 3  1.png';

export default function Loading() {
  return (
    <div className="initial-loader">
      <Image src={logo} alt="Vault logo" priority />
    </div>
  );
}


