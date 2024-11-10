export interface Player {
  id?: number;
  longName: string;
  age: number;
  playerPositions: string;
  playerFaceUrl?: string;
  clubName?: string | undefined;
  nationalityName?: string | undefined;
  preferredFoot?: PreferredFoot;
  bodyType?: BodyType;
  heightCm?: number;
  weightKg?: number;
  potential: number;
  overall: number;
  fifaVersion: number;
  fifaUpdate: number;
  passing?: number;
  dribbling?: number;
  shooting?: number;
}

export interface PlayerState {
  loading: boolean;
  error: string | null;
  player: Player | null;
  players: Player[];
  successMessage: string | null;
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
  TWENTYFOUR = '24',
  TWENTYTHREE = '23',
  TWENTYTWO = '22',
  TWENTYONE = '21',
  TWENTY = '20',
  NINETEEN = '19',
  EIGHTEEN = '18',
  SEVENTEEN = '17',
  SIXTEEN = '16',
  FIFTEEN = '15',
}

export enum FifaUpdate {
  TEN = '10',
  NINE = '9',
  EIGHT = '8',
  SEVEN = '7',
  SIX = '6',
  FIVE = '5',
  FOUR = '4',
  THREE = '3',
  TWO = '2',
  ONE = '1',
}

export enum playerFaceUrl {
  ROSTROA = 'https://cdn.sofifa.net/players/227/204/23_120.png',
  ROSTROB = 'https://cdn.sofifa.net/players/227/354/23_120.png',
}
