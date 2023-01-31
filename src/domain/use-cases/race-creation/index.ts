import { Race } from 'domain/models/race'

export type RaceCreationParams = {
  title: string
}
export interface RaceCreation {
  create(params: RaceCreationParams): Promise<Race>
}
