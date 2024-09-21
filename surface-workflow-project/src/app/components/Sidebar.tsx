const Sidebar: React.FC = () => {
    return (
      <div className="w-64 h-screen bg-gray-100 shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          surface <span className="text-blue-600">labs</span>
        </h2>
        <nav>
          <a href="#" className="block py-2 px-4 mb-2 text-gray-600 font-medium hover:bg-blue-100 hover:text-gray-900 rounded-md">
            Getting started
          </a>
          <a href="#" className="block py-2 px-4 mb-2 text-gray-600 hover:bg-blue-100 hover:text-gray-900 rounded-md">
            Overview
          </a>
          <a href="#" className="block py-2 px-4 mb-2 text-gray-600 hover:bg-blue-100 hover:text-gray-900 rounded-md">
            Funnels
          </a>
          <a href="#" className="block py-2 px-4 mb-2 text-gray-600 hover:bg-blue-100 hover:text-gray-900 rounded-md">
            Leads
          </a>
          <a href="#" className="block py-2 px-4 mb-2 text-gray-600 hover:bg-blue-100 hover:text-gray-900 rounded-md">
            Segments
          </a>
          <a href="#" className="block py-2 px-4 mb-2 text-gray-600 hover:bg-blue-100 hover:text-gray-900 rounded-md">
            Workflows
          </a>
          <a href="#" className="block py-2 px-4 mb-2 text-gray-600 hover:bg-blue-100 hover:text-gray-900 rounded-md">
            Integrations
          </a>
          <a href="#" className="block py-2 px-4 mb-2 text-gray-600 hover:bg-blue-100 hover:text-gray-900 rounded-md">
            Settings
          </a>
        </nav>

        <div className="absolute bottom-6 flex items-center">
          <img src="/path/to/profile-pic.jpg" alt="Chris Hood" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h3 className="text-gray-900">Chris Hood</h3>
            <p className="text-gray-600 text-sm">hello@example.com</p>
          </div>
        </div>
      </div>
    );
  };

  export default Sidebar;
