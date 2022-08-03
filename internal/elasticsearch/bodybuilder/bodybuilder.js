import BodyBuilder from 'bodybuilder'

export const productSearchByCategoryIdBuilder = (query, sort) => {
  query.keyword = getKeyRegexp(query.keyword);
  return BodyBuilder().query("match_phrase_prefix", "searchString", query.keyword)
  .filter('term', 'status', query.status)
  .filter('terms', 'categories', query.categories)
  .sort(sort.name, sort.type)
  .from(query.skip).size(query.limit).build()
}

export const productSearchBuilder = (query, sort) => {
  query.keyword = getKeyRegexp(query.keyword);
  return BodyBuilder().query("match_phrase_prefix", "searchString", query.keyword)
  .filter('term', 'status', query.status)
  .sort(sort.name, sort.type)
  .from(query.skip).size(query.limit).build()
}

export const countProductBuilder = (query) => {
  query.keyword = getKeyRegexp(query.keyword);
  return BodyBuilder().query("match_phrase_prefix", "searchString", query.keyword).filter('term', 'status', query.status).size(0).build();
}
export const countProductByCategoryIdBuilder = (query) => {
  query.keyword = getKeyRegexp(query.keyword);
  return BodyBuilder().query("match_phrase_prefix", "searchString", query.keyword).filter('term', 'status', query.status)
  .filter('terms', 'categories', query.categories).size(0).build();
}

export const getAllProductByProductBuilder = () => {
  return BodyBuilder().size(100).from(0).query('match_all', {});
};

function getKeyRegexp(keyword) {
  let split = keyword.split(" ");
  let key = "";
  for (let i = 0; i < split.length; i++) {
    if (split[i]) {
      key += i !== (split.length - 1) ? `.*${split[i]}*.|` : `.*${split[i]}*.`
    }
  }
  return key
}
