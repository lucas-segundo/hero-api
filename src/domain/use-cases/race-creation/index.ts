export type RaceCreationParams = {
  title: string
}

export type RaceCreated = {
  id: string
  title: string
}
export interface RaceCreation {
  create(params: RaceCreationParams): Promise<RaceCreated>
}
