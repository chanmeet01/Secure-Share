import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

function Files() {
  return (
    <div>
      <SignedOut>
        Click here to <SignInButton />
      </SignedOut>
      <SignedIn>
        Files<UserButton />
      </SignedIn>
    </div>
  );
}

export default Files;
