export type RaceFinderRepositoryModel = {
  id: string | number
  title: string
}

export type RaceFinderRepositoryParams = {
  id: string | number
}

export interface RaceFinderRepository {
  find(params: RaceFinderRepositoryParams): Promise<RaceFinderRepositoryModel>
}
