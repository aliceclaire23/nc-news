formatDate = postgresDate => {
  const reversedDate = postgresDate.match(/^.{10}/)[0];
  const newDate = reversedDate
    .split('-')
    .reverse()
    .join('-');
  return newDate;
};

export default { formatDate };
