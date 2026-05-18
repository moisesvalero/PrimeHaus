export const primeProjectsListQuery = `*[_type == "primeProject"] | order(homeSortOrder asc){
  _id,
  showOnHome,
  homeSortOrder,
  title,
  slug,
  price,
  location,
  heroTag,
  heroDescription,
  specs,
  images,
  videoUrl,
  body,
  seoDescription
}`;

export const primeProjectsHomeQuery = `*[_type == "primeProject" && showOnHome == true] | order(homeSortOrder asc){
  _id,
  showOnHome,
  homeSortOrder,
  title,
  slug,
  price,
  location,
  heroTag,
  heroDescription,
  specs,
  images,
  videoUrl,
  body,
  seoDescription
}`;

export const primeProjectBySlugQuery = `*[_type == "primeProject" && slug.current == $slug][0]{
  _id,
  showOnHome,
  homeSortOrder,
  title,
  slug,
  price,
  location,
  heroTag,
  heroDescription,
  specs,
  images,
  videoUrl,
  body,
  seoDescription
}`;
