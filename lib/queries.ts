import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`
  *[
    _type == "blog_bravix" &&
    published == true &&
    defined(slug.current) &&
    lang == $lang
  ] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    readingTime,
    views,
    isLatest,
    featured,
    image{
      ...,
      alt
    },
    lang,
    "category": category->{
      title,
      "slug": slug.current
    },
    author,
    "tags": tags[]->{
      title,
      "slug": slug.current
    },
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[
    _type == "blog_bravix" &&
    published == true &&
    defined(slug.current) &&
    lang == $lang
  ][]{
    "slug": slug.current
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "blog_bravix" &&
    published == true &&
    slug.current == $slug &&
    lang == $lang
  ][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    readingTime,
    views,
    isLatest,
    featured,
    body,
    image{
      ...,
      alt
    },
    lang,
    translationGroup,
    author,
    "category": category->{
      title,
      "slug": slug.current
    },
    "tags": tags[]->{
      title,
      "slug": slug.current
    },
  }
`);

export const LATEST_BLOGS_QUERY = defineQuery(`
  *[
    _type == "blog_bravix" &&
    published == true &&
    isLatest == true
  ] | order(publishedAt desc)[0...4]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    readingTime,
    views,
    isLatest,
    featured,
    image{
      ...,
      alt
    },
    lang,
    "category": category->{
      title,
      "slug": slug.current
    },
    author,
    "tags": tags[]->{
      title,
      "slug": slug.current
    },
  }
`);

export const BLOG_TRANSLATIONS_QUERY = defineQuery(`
  *[
    _type == "blog_bravix" &&
    published == true &&
    translationGroup == $translationGroup
  ]{
    lang,
    "slug": slug.current,
    title
  }
`);

export const POPULAR_BLOGS_QUERY = defineQuery(`
  *[
    _type == "blog_bravix" &&
    published == true &&
    lang == $lang
  ] | order(coalesce(views, 0) desc, publishedAt desc)[0...4]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    readingTime,
    views,
    isLatest,
    featured,
    image{
      ...,
      alt
    },
    lang,
    "category": category->{
      title,
      "slug": slug.current
    },
    author,
    "tags": tags[]->{
      title,
      "slug": slug.current
    },
  }
`);

export const FEATURED_BLOG_QUERY = defineQuery(`
  *[
    _type == "blog_bravix" &&
    published == true &&
    lang == $lang &&
    featured == true
  ] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    readingTime,
    views,
    isLatest,
    featured,
    image{
      ...,
      alt
    },
    lang,
    "category": category->{
      title,
      "slug": slug.current
    },
    author,
    "tags": tags[]->{
      title,
      "slug": slug.current
    },
  }
`);