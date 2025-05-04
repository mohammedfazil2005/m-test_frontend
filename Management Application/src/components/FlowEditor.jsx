import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { addEdge, Background, Controls, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import io from 'socket.io-client';
import {  onGetFlow, onSaveFlow } from '../services/allAPI';
import { Link } from 'react-router-dom';

function FlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect  = useCallback(async(params) => {
    setEdges((eds) => addEdge(params, eds));
  
    const updatedEdges = addEdge(params, edges);
    console.log(updatedEdges)
    const headerPay={
      'Authorization':`Bearer ${sessionStorage.getItem('token')}`
    }
    const payload={
      nodes:nodes,
      edges:updatedEdges
    }
    try {
      const severResponce=await onSaveFlow(payload,headerPay)
      console.log(severResponce)
    } catch (error) {
      console.log(error)
    }
  }, [edges, nodes]);



  const handleAddNode = async() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 250, y: Math.random() * 450 },
    };
    const updatedNodes=[...nodes,newNode]
    const payload={
      nodes:updatedNodes,
      edges:edges
    }
    const headerPay={
      'Authorization':`Bearer ${sessionStorage.getItem('token')}`
    }
    try {
      const severResponce=await onSaveFlow(payload,headerPay)
      console.log(severResponce)
      setNodes(updatedNodes);
    } catch (error) {
      console.log(error)
    }

    
  };

  const onFetchFlow=async()=>{
    try {
      const header={
        'Authorization':`bearer ${sessionStorage.getItem('token')}`
      }
      const serverResponce=await onGetFlow(header)
      console.log(serverResponce.data.flow)
      setNodes(serverResponce.data.flow.nodes || []);
      setEdges(serverResponce.data.flow.edges || []);
    } catch (error) {
      console.log(error)
    }
  }

  const onNodesDelete = async (deletedNodes) => {
    // Remove deleted nodes from current list
    const updatedNodes = nodes.filter((node) => !deletedNodes.some((d) => d.id === node.id));
  
    const payload = {
      nodes: updatedNodes,
      edges, // keep existing edges (could add logic to remove edges connected to deleted nodes too)
    };
  
    const header = {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    };
  
    try {
      await onSaveFlow(payload, header);
      setNodes(updatedNodes);
      console.log('Nodes deleted and flow updated.');
    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };

  const onEdgesDelete = async (deletedEdges) => {
    // Remove deleted edges from current list
    const updatedEdges = edges.filter((edge) => !deletedEdges.some((d) => d.id === edge.id));
  
    const payload = {
      nodes,
      edges: updatedEdges,
    };
  
    const header = {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    };
  
    try {
      await onSaveFlow(payload, header);
      setEdges(updatedEdges);
      console.log('Edges deleted and flow updated.');
    } catch (error) {
      console.error('Error deleting edge:', error);
    }
  };

  useEffect(()=>{
    onFetchFlow()
  },[])




  return (
    <div style={{ height: '100vh',width:"100%" }}>
        <button className='btn btn-success' onClick={handleAddNode} style={{ margin: '10px' }}>
        ➕ Add Node
      </button>
     <Link to={'/'}><button className='float-end btn btn-primary mt-3 me-2'>Back to Home</button></Link> 
      <div className='container-fluid' style={{height:'100vh'}}>
      <ReactFlow
         nodes={nodes}
         edges={edges}
         onNodesChange={onNodesChange}
         onNodesDelete={onNodesDelete}
         onEdgesDelete={onEdgesDelete}
         onEdgesChange={onEdgesChange}
         onConnect={onConnect}
      >
        <Background style={{width:'500px'}} />
        <Controls/>
      </ReactFlow>
      </div>
    </div>
  );
}

export default FlowChart;
