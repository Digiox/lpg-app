import dynamic from 'next/dynamic';

// Dynamically import the Admin component with SSR disabled
const Admin = dynamic(() => import('../../components/admin-app/AdminApp'), { ssr: false });

const Page = () => {
  return <Admin />;
};

export default Page;
