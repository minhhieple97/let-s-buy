import ThemeToggle from '@/components/shared/theme-toggle';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { SignedOut, SignUpButton } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { SignedIn } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="p-5">
      <div className="w-full flex justify-end">
        <ThemeToggle />
        <div className="flex gap-4">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
