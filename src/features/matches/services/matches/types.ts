// TODO eventually replace with generic

export type MatchesServiceDataState<T> = {
  data: T,
  errorMessage: string;
  isLoading: boolean;
}