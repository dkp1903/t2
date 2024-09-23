import React, { useState } from 'react';

const InstallSurfaceTag = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [copyStatus, setCopyStatus] = useState(''); // State for copy feedback
  const scriptCode = `<script>
  (function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      'surface.start': new Date().getTime(),
      event: 'surface.js',
    });
    var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'surface' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.surface-analytics.com/tag.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'surface', 'SURFACE_TAG_ID');
</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptCode).then(() => {
      setCopyStatus('Script copied successfully!');
      setTimeout(() => setCopyStatus(''), 3000); 
    });
  };

  const handleTestConnection = async () => {
    setConnectionStatus('Checking for Tag...');
    try {
      const response = await fetch('https://5500-dkp1903-t2-da7401yta8s.ws-us116.gitpod.io');
      if (response.ok) {
        setConnectionStatus('Tag loaded successfully!');
      } else {
        setConnectionStatus('Tag is not loaded.');
      }
    } catch (error) {
      setConnectionStatus('Connection failed. Server not running.');
    }
  };

  return (
    <div className="bg-white rounded-md shadow p-4 my-4">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex justify-between items-center mb-2"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          Install the Surface Tag
        </h2>
        <button
          className={`transform transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ⬇️
        </button>
      </div>

      {isOpen && (
        <div className="mt-4">
          <p className="text-gray-700 mb-2">
            Enable tracking and analytics on your site by pasting this script:
          </p>
          <div className="relative p-4 bg-gray-100 text-gray-800 rounded-md shadow">
            <pre className="whitespace-pre-wrap text-sm">
              <code>{scriptCode}</code>
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Copy Snippet
            </button>
          </div>

        
          {copyStatus && (
            <p className="mt-2 text-blue-600 font-semibold">{copyStatus}</p>
          )}

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleTestConnection}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Test connection
            </button>
            <p className="text-gray-700">{connectionStatus}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstallSurfaceTag;
