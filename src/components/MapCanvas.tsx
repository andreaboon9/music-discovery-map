import { useCallback, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Node, 
  Edge,
  ConnectionMode,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useMapStore } from '../store/useMapStore';
import { ArtistNode } from './ArtistNode';

const nodeTypes = {
  artist: ArtistNode,
};

export const MapCanvas = () => {
  const artists = useMapStore(state => state.nodes);
  const centerArtistId = useMapStore(state => state.centerArtistId);
  const selectNode = useMapStore(state => state.selectNode);

  const nodes: Node[] = useMemo(() => {
    if (artists.length === 0) return [];

    return artists.map((artist, index) => {
      const isCenter = artist.id === centerArtistId;
      
      if (isCenter) {
        return {
          id: artist.id,
          type: 'artist',
          data: { ...artist, isCenter: true },
          position: { x: 400, y: 300 },
        };
      }
      
      const angle = (index * Math.PI * 2) / (artists.length - 1);
      const distance = 150 + (index * 40);
      
      return {
        id: artist.id,
        type: 'artist',
        data: { ...artist, isCenter: false },
        position: { 
          x: 400 + Math.cos(angle) * distance, 
          y: 300 + Math.sin(angle) * distance 
        },
      };
    });
  }, [artists, centerArtistId]);

  const edges: Edge[] = useMemo(() => {
    return [];
  }, []);

  const onNodeClick = useCallback((_: any, node: Node) => {
    selectNode(node.id);
  }, [selectNode]);

  return (
    <div className="w-full h-screen bg-[#191414]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        minZoom={0.5}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        panOnScroll={true}
        zoomOnScroll={true}
        panOnDrag={true}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1DB954" className="opacity-10" />
      </ReactFlow>
    </div>
  );
};
