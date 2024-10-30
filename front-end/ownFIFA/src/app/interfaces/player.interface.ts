export interface Player {
  id?: number;
  longName: string;
  age: number;
  playerPositions: PlayerPositions[];
  playerFaceUrl: string;
  clubName: string;
  nationalityName: string;
  preferredFoot: PreferredFoot;
  bodyType: BodyType;
  heightCm: number;
  weightKg: number;
  potential: number;
  overall: number;
  fifaVersion: number;
  fifaUpdate: number;
  skills?: string;
}

export enum PlayerPositions {
  ST = 'ST',
  RW = 'RW',
  LW = 'LW',
  RM = 'RM',
  LM = 'LM',
  CF = 'CF',
  CAM = 'CAM',
  CM = 'CM',
  CDM = 'CDM',
  CB = 'CB',
  LB = 'LB',
  RB = 'RB',
  GK = 'GK',
}

export enum PreferredFoot {
  LEFT = 'Left',
  RIGHT = 'Right',
  BOTH = 'Both',
}

export enum BodyType {
  UNIQUE = 'Unique',
  NORMAL170MINUS = 'Normal (170-)',
  NORMAL170PLUS = 'Normal (170-185)',
  LEAN170PLUS = 'Lean (170-185)',
  LEAN185PLUS = 'Lean (185+)',
}

export enum FifaVersion {
  TWENTYTWO = "22",
  TWENTYTHREE = "23",
  TWENTYFOUR = "24",
}

export enum FifaUpdate {
  TEN = "10",
  NINE = "9",
  EIGHT = "8",
  SEVEN = "7",
  SIX = "6",
  FIVE = "5",
  FOUR = "4",
  THREE = "3",
  TWO = "2",
  ONE = "1"
}