import React from 'react';
import InstallSurfaceTag from './InstallSurfaceTag';
import TestSurfaceTagEvents from './TestSurfaceTagEvents';

const SurfaceTags: React.FC = () => {
  return (
    <div className="flex-1 bg-white p-6">
      <h1 className="text-2xl font-semibold mb-4 text-black">Getting started</h1>
      <InstallSurfaceTag />
      <TestSurfaceTagEvents />
    </div>
  );
};

export default SurfaceTags;
