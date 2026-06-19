"use client"

export default function AboutPage() {
  return (
    <div className="flex">
      <h1>Page about</h1>
      <button 
      onClick={() => alert("Click ringard")}
      className="text-xl text-yellow-700 border p-6 rounded ml-auto cursor-pointer">
        {"Click"}
      </button>
    </div>
  );
}
