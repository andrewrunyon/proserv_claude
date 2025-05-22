import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const PageNotFound: React.FC = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 flex space-x-4">
        <Button
          variant="outline"
          size="lg"
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
        <Link to="/">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Home size={16} />}
          >
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;