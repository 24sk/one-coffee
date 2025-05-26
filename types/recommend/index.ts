export type { RecommendRequest, RecommendResponse, Bean } from '~/shared/schemas/recommend';
import type { RecommendRequest, RecommendResponse } from '~/shared/schemas/recommend';

/** おすすめリクエストに recommendationId を追加した型 */
export interface RecommendRequestWithId extends RecommendRequest {
  recommendationId: string;
}
export interface RecommendResponseWithId extends RecommendResponse {
  recommendationId: string;
}
