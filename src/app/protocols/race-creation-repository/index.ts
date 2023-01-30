export type RaceCreationRepositoryParams = {
  title: string
}
export type RaceCreationRepositoryModel = {
  id: string
}

export interface RaceCreationRepository {
  create(
    params: RaceCreationRepositoryParams
  ): Promise<RaceCreationRepositoryModel>
}
