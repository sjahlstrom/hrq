import Link from "next/link";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="fixed right-4 top-32 items-center justify-end z-50 gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button
              size="sm"
              variant="primary"
          className="rounded-xl fixed right-2 z-50 gap-x-2"

          >
            Login
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            {/*<Link href={`/u/${user.username}`}>*/}
            {/*  <Bell className="h-5 w-5 lg:mr-2" />*/}
            {/*</Link>*/}
          </Button>
          <UserButton />
        </div>
      )}
    </div>
  );
};
