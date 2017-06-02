export interface RedPacketEvent {
  id: string;
  type: number;
  uid: string;
  rid: string;
  occurred_at: Date;
  amount: number;
  factor: number;
  undo: boolean;
};

export interface RollEvent {
  id: string;
  type: number;
  uid: string;
  count: number;
  occurred_at: Date;
  undo: boolean;
};
