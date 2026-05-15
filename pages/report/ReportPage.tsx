/**
 * AI Coding 从个人使用到公司级落地 - 报告页面
 */

import { Sidebar } from './components/Sidebar';
import {
  Section0,
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  Section6,
  Section7,
  Section8,
  Section9,
  Section10,
  Section11,
} from './components/sections';

export default function ReportPage() {
  return (
    <div className="flex justify-center w-full min-h-screen bg-[#FAFAFA] font-sans selection:bg-zinc-200">
      <div className="flex w-full max-w-[1400px]">
        {/* Left Sidebar Table of Contents */}
        <div className="hidden lg:block w-72 shrink-0">
          <Sidebar />
        </div>

        {/* Main Document Content */}
        <main className="flex-1 min-w-0 pb-32">
          <div className="max-w-4xl mx-auto px-6 md:px-12 xl:px-16">
            <Section0 />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            <Section7 />
            <Section8 />
            <Section9 />
            <Section10 />
            <Section11 />
          </div>
        </main>
      </div>
    </div>
  );
}
