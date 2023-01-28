export type RaceCreationParams = {
  title: string
}

export interface RaceCreation {
  create(params: RaceCreationParams): number
}
