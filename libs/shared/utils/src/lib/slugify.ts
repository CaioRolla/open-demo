export const slugify = (input: string, options?: { strict: boolean }): string | null => {
  const processed = input ? input.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    // .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    // .replace(/-+$/, '')            // Trim - from end of text
    .replace('---', '-')
    .replace('----', '-')
    .replace('--', '-')
    : null ;


  if (!options || !processed) {
    return processed ;
  }

  if (options.strict) {
    return processed
      .replace(/\-\-+/g, '-')
      .replace(/-+$/, '')
  }

  return processed ;

};

export const isSlug = (input: string): boolean => {

  return /^[a-z](-?[a-z])*$/.test(input);

}
