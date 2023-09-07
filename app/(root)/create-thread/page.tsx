
import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();  // Return login user
  if(!user) return null;   // if no user exist , return null

  // Fetch user data from database
  const userInfo: any = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding');

  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={userInfo._id} />
    </>
  );
}

export default Page;
