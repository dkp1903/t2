"use client";
import Sidebar from './components/Sidebar';
import SurfaceTags from "./components/SurfaceTags";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <SurfaceTags />
    </div>
  );
}
