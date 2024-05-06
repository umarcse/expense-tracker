import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (<>
  
  <div className="flex justify-center mt-3">
  <SignUp path="/sign-up" />
  </div>
  
  </>);
}