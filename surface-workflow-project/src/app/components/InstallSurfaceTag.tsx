import React, { useState } from 'react';

const InstallSurfaceTag = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('');
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
      alert('Script copied!');
    });
  };

  const handleTestConnection = () => {
    setConnectionStatus('Checking for connection...');
    // Simulate checking
    setTimeout(() => {
      setConnectionStatus('Connection successful!');
    }, 2000);
  };

  return (
    <div className="bg-white rounded-md shadow p-4 my-4">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex justify-between items-center"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          Install Surface Tag on your site
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
          <div className="p-4 bg-white text-gray-800 rounded-md shadow">
            <pre className="whitespace-pre-wrap">
              <code className="text-sm">{scriptCode}</code>
            </pre>
            <button
              onClick={copyToClipboard}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Copy Snippet
            </button>
          </div>

          <button
            onClick={handleTestConnection}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Test connection
          </button>
          <p className="mt-2 text-gray-700">{connectionStatus}</p>
        </div>
      )}
    </div>
  );
};

export default InstallSurfaceTag;
