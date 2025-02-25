export type NodeId = number;

export type Reading = {
  node_id: NodeId;
  lux: number;
  temperature: number;
  timestamp: number;
};

export type ReadingBody = Reading[] | Reading;

export type HandshakeBody = { name: string };

export type HandshakeReply = {
  node_id: NodeId;
  timestamp: number;
  poll_interval: number;
};
