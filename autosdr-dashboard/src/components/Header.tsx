"use client";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="flex items-center justify-between h-16 px-6">
        <h1 className="text-2xl font-semibold text-slate-900">AutoSDR</h1>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-slate-700">U</span>
          </div>
        </div>
      </div>
    </header>
  );
}