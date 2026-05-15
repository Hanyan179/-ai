import React from 'react';
import { motion } from 'framer-motion';
import { ExternalService, ArchNode } from '../../types';
import { NODE_STYLES, LINE_STYLES } from '../../architectureConstants';

interface ExternalServicesLayerProps {
  services: ExternalService[];
  nodes: ArchNode[];
}

/**
 * 获取节点中心点坐标
 */
const getNodeCenter = (node: ArchNode | undefined): { x: number; y: number } | null => {
  if (!node?.position) return null;
  
  const width = node.type === 'component' ? 140 : node.type === 'fusion' ? 160 : 180;
  const height = node.type === 'component' ? 80 : node.type === 'fusion' ? 90 : 80;
  
  return {
    x: node.position.x + width / 2,
    y: node.position.y + height / 2,
  };
};

const ExternalServicesLayer: React.FC<ExternalServicesLayerProps> = ({
  services,
  nodes,
}) => {
  const style = NODE_STYLES.service;

  return (
    <g className="external-services-layer">
      {/* 外部服务区域标题 */}
      <text
        x={850}
        y={80}
        fill="#94A3B8"
        fontSize={14}
        fontWeight={600}
        textAnchor="middle"
      >
        外部服务层
      </text>

      {/* 渲染每个外部服务节点 */}
      {services.map((service, index) => {
        const x = service.position?.x ?? 850;
        const y = service.position?.y ?? (100 + index * 100);

        return (
          <motion.g
            key={service.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* 服务节点背景 */}
            <rect
              x={x}
              y={y}
              width={130}
              height={70}
              rx={8}
              fill="url(#serviceGradient)"
              stroke="#10B981"
              strokeWidth={1}
              className="transition-all duration-300 hover:stroke-2"
            />

            {/* 服务名称 */}
            <text
              x={x + 65}
              y={y + 25}
              fill="#FFFFFF"
              fontSize={12}
              fontWeight={600}
              textAnchor="middle"
            >
              {service.name}
            </text>

            {/* 服务描述 */}
            <text
              x={x + 65}
              y={y + 45}
              fill="#94A3B8"
              fontSize={9}
              textAnchor="middle"
            >
              {service.desc.length > 18 
                ? service.desc.substring(0, 18) + '...' 
                : service.desc}
            </text>

            {/* 技术细节（hover 显示） */}
            {service.techDetail && (
              <text
                x={x + 65}
                y={y + 60}
                fill="#6B7280"
                fontSize={8}
                textAnchor="middle"
              >
                {service.techDetail.length > 22
                  ? service.techDetail.substring(0, 22) + '...'
                  : service.techDetail}
              </text>
            )}

            {/* 连接线到相关模块 */}
            {service.connectedTo.map((targetId) => {
              const targetNode = nodes.find(n => n.id === targetId);
              const targetCenter = getNodeCenter(targetNode);
              
              if (!targetCenter) return null;

              const serviceCenter = {
                x: x,
                y: y + 35,
              };

              // 使用贝塞尔曲线连接
              const controlX = (serviceCenter.x + targetCenter.x) / 2;
              const path = `M ${serviceCenter.x} ${serviceCenter.y} 
                           Q ${controlX} ${serviceCenter.y} 
                             ${targetCenter.x + 90} ${targetCenter.y}`;

              return (
                <path
                  key={`${service.id}-${targetId}`}
                  d={path}
                  fill="none"
                  stroke={LINE_STYLES.tech.stroke}
                  strokeWidth={LINE_STYLES.tech.strokeWidth}
                  strokeDasharray="3,3"
                  opacity={0.6}
                  className="transition-opacity duration-300 hover:opacity-100"
                />
              );
            })}
          </motion.g>
        );
      })}

      {/* 定义渐变 */}
      <defs>
        <linearGradient id="serviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>
      </defs>
    </g>
  );
};

export default ExternalServicesLayer;
