import React, { useEffect, useState } from 'react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function FlowChart() {
  const [nodes, setNodes] = useState([
    {
      id: '1',
      data: { label: 'Loading sensor data...' },
      position: { x: 250, y: 5 },
    },
  ]);

  useEffect(() => {
    socket.on('payload', (data) => {
      console.log('Live Data:', data);

    
      setNodes((nds) =>
        nds.map((node) =>
          node.id === '1'
            ? {
                ...node,
                data: {
                  label: `🌡 Temp: ${data.temperature}°C\n💧 Humidity: ${data.humidity}%`,
                },
              }
            : node
        )
      );
    });

    return () => socket.off('payload');
  }, []);

  return (
    <div style={{ height: '100vh',width:"100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={[]}
        fitView
        nodesDraggable={true}
        zoomOnScroll={true} 
      >
        <Background style={{width:'500px'}} />
      </ReactFlow>
    </div>
  );
}

export default FlowChart;
