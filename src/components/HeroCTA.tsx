import { Button } from './Button';
import Link from 'next/link';

const HeroCTA: React.FC = () => {
  return (
    <Link href="https://synthiq.io/our-offerings/">
      <Button
        variant="solid"
        className="bg-blue-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded-full transition-transform transform hover:scale-105"
      >
        Get Started
      </Button>
    </Link>
  );
};

export default HeroCTA;
