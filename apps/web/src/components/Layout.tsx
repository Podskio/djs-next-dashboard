const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-gray-800 p-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded bg-gray-700 p-8 text-white shadow">
        {children}
      </div>
    </div>
  );
};

export default Layout;
