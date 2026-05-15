import { useState, useEffect } from 'react';
import { cn } from './utils';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'part-0', label: '总体结论' },
  { id: 'part-1', label: '个人到公司视角' },
  { id: 'part-2', label: '统一入口' },
  { id: 'part-3', label: '行动路线图' },
  { id: 'part-4', label: '短期快速见效' },
  { id: 'part-5', label: '数据与资产沉淀' },
  { id: 'part-6', label: '持续维护更新' },
  { id: 'part-7', label: '量化与真实验证' },
  { id: 'part-8', label: '资产路由发现' },
  { id: 'part-9', label: '技术实现方向' },
  { id: 'part-10', label: '团队协作方式' },
  { id: 'part-11', label: '最终总架构' },
];

export function Sidebar() {
  const [activeId, setActiveId] = useState<string>('part-0');

  useEffect(() => {
    const observers = new Map();
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    });

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
        observers.set(item.id, element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-12 left-0 h-[calc(100vh-6rem)] w-64 pt-12 pb-8 pr-6 hidden lg:flex flex-col">
      <div className="mb-8 px-3">
        <h1 className="text-sm font-semibold text-[#111111] uppercase tracking-wider mb-1">汇报提纲</h1>
        <p className="text-xs text-[#666666]">AI Coding 公司级落地方案</p>
      </div>
      <ul className="flex-1 overflow-y-auto space-y-1 relative">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className={cn(
                "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors relative z-10",
                activeId === item.id ? "text-[#111111] font-medium" : "text-[#666666] hover:bg-zinc-100/50 hover:text-[#111111]"
              )}
            >
              {activeId === item.id && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm border border-zinc-200/50"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-20">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
