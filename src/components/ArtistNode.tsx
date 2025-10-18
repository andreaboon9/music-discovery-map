import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Artist } from '../types';

interface ArtistNodeData extends Artist {
  isCenter?: boolean;
}

export const ArtistNode = memo(({ data }: NodeProps<ArtistNodeData>) => {
  const isCenter = data.isCenter ?? false;
  
  return (
    <div className="relative group">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="flex flex-col items-center">
        <p className={`text-white font-semibold px-4 py-2 bg-[#1DB954]/30 backdrop-blur-sm rounded-full transition-all group-hover:bg-[#1DB954]/50 group-hover:scale-105 ${
          isCenter 
            ? 'text-2xl bg-[#1DB954]/60 ring-4 ring-[#1DB954]/40' 
            : 'text-lg'
        }`}>
          {data.name}
        </p>
      </div>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
});

ArtistNode.displayName = 'ArtistNode';
