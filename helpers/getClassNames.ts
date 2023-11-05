type T = (classNames: (any)[]) => string
const getClassNames:T = (classNames) => {
  const filtered = classNames.filter((i:any) => typeof i === 'string' && i !== undefined);
  return filtered.join(' ')
};
export default getClassNames;