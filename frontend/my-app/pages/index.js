import { useEffect } from "react";
import { useRouter } from "next/router";  // Import useRouter from next/router

const IndexPage = () => {
  const router = useRouter();  // Initialize the router

  useEffect(() => {
    // Redirect to /resources page when the component mounts
    router.push("/resources");
  }, [router]);

  return null;  // This page does not need to render anything as it's just a redirect
};

export default IndexPage;
