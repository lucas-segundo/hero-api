import { Race } from 'domain/models/race'

export type RaceFinderParams = {
  id: string
}

export interface RaceFinder {
  find(params: RaceFinderParams): Promise<Race>
}
