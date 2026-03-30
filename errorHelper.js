import chalk from "chalk";

export function analyzeError(err) {
  console.log(chalk.red("\nRequest Failed\n"));

  if (err.response) {
    const status = err.response.status;

    console.log(`Status: ${status}`);

    if (status === 401) {
      console.log(chalk.yellow("Hint: 認証ヘッダ(APIトークン等)を確認"));
    } else if (status === 403) {
      console.log(chalk.yellow("Hint: 権限不足の可能性"));
    } else if (status === 404) {
      console.log(chalk.yellow("Hint: URLまたはリソースが存在しない"));
    } else if (status === 400) {
      console.log(chalk.yellow("Hint: パラメータ形式(JSON構造)を確認"));
    }
  } else {
    console.log(chalk.yellow("Hint: ネットワークエラーまたはURL不正"));
  }

  console.log("\n詳細:");
  console.log(err.message);
}
