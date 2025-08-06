import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Welcome to Virtual Avatar Builder App
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Create and customize your own virtual avatar! Choose features, colors, and outfits, then download or share your unique creation.
        </p>
        <Link to="/avatar-builder">
          <Button size="lg" className="text-lg px-8 py-4">
            Go to Avatar Builder
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;