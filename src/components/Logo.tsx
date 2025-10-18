export const Logo = () => {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Center play button */}
      <rect x="35" y="35" width="30" height="30" rx="6" fill="#1DB954" />
      <path d="M45 42 L45 58 L58 50 Z" fill="#191414" />
      
      {/* Network nodes */}
      <circle cx="50" cy="10" r="6" fill="#1DB954" />
      <circle cx="20" cy="30" r="6" fill="#1DB954" />
      <circle cx="15" cy="65" r="6" fill="#1DB954" />
      <circle cx="50" cy="90" r="6" fill="#1DB954" />
      <circle cx="85" cy="65" r="6" fill="#1DB954" />
      <circle cx="80" cy="30" r="6" fill="#1DB954" />
      <circle cx="65" cy="50" r="6" fill="#1DB954" />
      
      {/* Network connections */}
      <line x1="50" y1="10" x2="50" y2="35" stroke="#1DB954" strokeWidth="2" />
      <line x1="50" y1="10" x2="20" y2="30" stroke="#1DB954" strokeWidth="2" />
      <line x1="50" y1="10" x2="80" y2="30" stroke="#1DB954" strokeWidth="2" />
      <line x1="20" y1="30" x2="35" y2="35" stroke="#1DB954" strokeWidth="2" />
      <line x1="20" y1="30" x2="15" y2="65" stroke="#1DB954" strokeWidth="2" />
      <line x1="15" y1="65" x2="35" y2="55" stroke="#1DB954" strokeWidth="2" />
      <line x1="15" y1="65" x2="50" y2="90" stroke="#1DB954" strokeWidth="2" />
      <line x1="50" y1="90" x2="50" y2="65" stroke="#1DB954" strokeWidth="2" />
      <line x1="50" y1="90" x2="85" y2="65" stroke="#1DB954" strokeWidth="2" />
      <line x1="85" y1="65" x2="65" y2="58" stroke="#1DB954" strokeWidth="2" />
      <line x1="85" y1="65" x2="80" y2="30" stroke="#1DB954" strokeWidth="2" />
      <line x1="80" y1="30" x2="65" y2="42" stroke="#1DB954" strokeWidth="2" />
      <line x1="65" y1="50" x2="35" y2="50" stroke="#1DB954" strokeWidth="2" />
    </svg>
  );
};
