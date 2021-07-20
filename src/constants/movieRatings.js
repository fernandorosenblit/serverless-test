/*
  Ratings defined here should have:
    * A corresponding icon in assets/icons/ratings/{rating}.svg
    * A corresponding translation with the key 'ratings.{rating}'
 */

export const RATINGS = {
  restricted: 'restricted',
  pg13: 'pg-13',
  pg: 'pg',
  general: 'general',
  nc17: 'nc-17'
};

export const SUPPORTED_RATINGS = Object.values(RATINGS);
