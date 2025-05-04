import React, { useCallback, useEffect, useState } from 'react'; // React and hooks
import ReactFlow, { addEdge, Background, Controls, useEdgesState, useNodesState } from 'reactflow'; // ReactFlow and hooks
import 'reactflow/dist/style.css'; // Importing ReactFlow styles
import io from 'socket.io-client'; // Socket.IO for real-time communication (not used in this code)
import { onGetFlow, onSaveFlow } from '../services/allAPI'; // API functions to fetch and save flow data
import { Link } from 'react-router-dom'; // Link for navigation

function FlowChart() {
  // State management for nodes and edges using ReactFlow hooks
  const [nodes, setNodes, onNodesChange] = useNodesState([]); 
  const [edges, setEdges, onEdgesChange] = useEdgesState([]); 

  // Handles connection between nodes (adding edges)
  const onConnect = useCallback(async (params) => {
    setEdges((eds) => addEdge(params, eds)); // Update edges state when a new connection is made

    const updatedEdges = addEdge(params, edges); // Create a new updated edges list
    console.log(updatedEdges); // Log updated edges for debugging
    const headerPay = {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Authorization header with token
    };
    const payload = {
      nodes: nodes, // Send current nodes
      edges: updatedEdges // Send updated edges
    };
    try {
      const serverResponce = await onSaveFlow(payload, headerPay); // Save updated flow to the server
      console.log(serverResponce); // Log server response
    } catch (error) {
      console.log(error); // Log any errors
    }
  }, [edges, nodes]); // Dependency array to re-run when edges or nodes change

  // Add new node to the flow
  const handleAddNode = async () => {
    const newNode = {
      id: (nodes.length + 1).toString(), // Generate unique node id
      data: { label: `Node ${nodes.length + 1}` }, // Node label
      position: { x: Math.random() * 250, y: Math.random() * 450 }, // Random position for the new node
    };
    const updatedNodes = [...nodes, newNode]; // Add the new node to the current nodes array
    const payload = {
      nodes: updatedNodes, // Updated nodes list
      edges: edges // Current edges list
    };
    const headerPay = {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Authorization header
    };
    try {
      const severResponce = await onSaveFlow(payload, headerPay); // Save the updated flow
      console.log(severResponce); // Log server response
      setNodes(updatedNodes); // Update the state with the new nodes
    } catch (error) {
      console.log(error); // Log any errors
    }
  };

  // Fetch the saved flow (nodes and edges) from the server
  const onFetchFlow = async () => {
    try {
      const header = {
        'Authorization': `bearer ${sessionStorage.getItem('token')}` // Authorization header
      };
      const serverResponce = await onGetFlow(header); // Fetch flow data from the server
      console.log(serverResponce.data.flow); // Log the flow data
      setNodes(serverResponce.data.flow.nodes || []); // Set nodes from the server response
      setEdges(serverResponce.data.flow.edges || []); // Set edges from the server response
    } catch (error) {
      console.log(error); // Log any errors
    }
  };

  // Handle deletion of nodes
  const onNodesDelete = async (deletedNodes) => {
    const updatedNodes = nodes.filter((node) => !deletedNodes.some((d) => d.id === node.id)); // Remove deleted nodes
    const payload = {
      nodes: updatedNodes, // Updated nodes list
      edges, // Current edges list
    };
    const header = {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Authorization header
    };
    try {
      await onSaveFlow(payload, header); // Save the updated flow after node deletion
      setNodes(updatedNodes); // Update the state with the new nodes
      console.log('Nodes deleted and flow updated.'); // Log success message
    } catch (error) {
      console.error('Error deleting node:', error); // Log any errors
    }
  };

  // Handle deletion of edges
  const onEdgesDelete = async (deletedEdges) => {
    const updatedEdges = edges.filter((edge) => !deletedEdges.some((d) => d.id === edge.id)); // Remove deleted edges
    const payload = {
      nodes, // Current nodes list
      edges: updatedEdges, // Updated edges list
    };
    const header = {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Authorization header
    };
    try {
      await onSaveFlow(payload, header); // Save the updated flow after edge deletion
      setEdges(updatedEdges); // Update the state with the new edges
      console.log('Edges deleted and flow updated.'); // Log success message
    } catch (error) {
      console.error('Error deleting edge:', error); // Log any errors
    }
  };

  // Fetch flow data when the component mounts
  useEffect(() => {
    onFetchFlow(); // Fetch the flow data when the component is mounted
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div style={{ height: '100vh', width: "100%" }}>
      {/* Button to add new node */}
      <button className='btn btn-success' onClick={handleAddNode} style={{ margin: '10px' }}>
        ➕ Add Node
      </button>
      {/* Link to navigate back to home */}
      <Link to={'/'}>
        <button className='float-end btn btn-primary mt-3 me-2'>Back to Home</button>
      </Link>
      <div className='container-fluid' style={{ height: '100vh' }}>
        <ReactFlow
          nodes={nodes} // Pass nodes state to ReactFlow
          edges={edges} // Pass edges state to ReactFlow
          onNodesChange={onNodesChange} // Handle node change events
          onNodesDelete={onNodesDelete} // Handle node deletion
          onEdgesDelete={onEdgesDelete} // Handle edge deletion
          onEdgesChange={onEdgesChange} // Handle edge change events
          onConnect={onConnect} // Handle node connection (adding edges)
        >
          <Background style={{ width: '500px' }} /> {/* Background for the flow chart */}
          <Controls /> {/* Controls to zoom and move around the flow */}
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowChart;
