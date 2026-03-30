import chalk from "chalk";

export function formatResponse(res) {
  console.log(chalk.blue(`\nStatus: ${res.status}`));
  console.log(chalk.yellow(`Time: ${res.duration}ms\n`));

  try {
    console.log(JSON.stringify(res.data, null, 2));
  } catch {
    console.log(res.data);
  }
}
