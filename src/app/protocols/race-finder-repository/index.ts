export type RaceFinderRepositoryModel = {
  id: string | number
  title: string
}

export type RaceFinderRepositoryParams = {
  id: string
}

export interface RaceFinderRepository {
  find(params: RaceFinderRepositoryParams): Promise<RaceFinderRepositoryModel>
}
