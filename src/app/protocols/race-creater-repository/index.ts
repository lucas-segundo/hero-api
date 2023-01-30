export type RaceCreaterRepositoryParams = {
  title: string
}
export type RaceCreaterRepositoryModel = {
  id: string
}

export interface RaceCreaterRepository {
  create(
    params: RaceCreaterRepositoryParams
  ): Promise<RaceCreaterRepositoryModel>
}
