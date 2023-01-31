export type RaceCreaterRepositoryParams = {
  title: string
}
export type RaceCreaterRepositoryModel = {
  id: string | number
  title: string
}

export interface RaceCreaterRepository {
  create(
    params: RaceCreaterRepositoryParams
  ): Promise<RaceCreaterRepositoryModel>
}
