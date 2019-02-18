function processLive(code) {
  const filteredCode = code
    .split('\n')
    .map(line => {
      if (line.startsWith('import')) {
        return '// ' + line;
      } else {
        return line;
      }
    })
    .filter(
      line => !line.startsWith('export') && !line.includes('eslint-disable'),
    )
    .join('\n');

  return filteredCode;
}

export default processLive;
