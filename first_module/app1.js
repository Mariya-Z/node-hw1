process.stdin.on('data', function(data) {
  if (data) {
    process.stdout.write(data.split('').reverse().join('') + '\n');
  }
});

process.stdin.setEncoding('utf8');
