const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const comment = core.getInput('comment');
    const github_token = core.getInput('GITHUB_TOKEN');
    const context = github.context;

    if(context.payload.pull_request == null) {
      core.setFailed('No Pull Request found');
      return;
    }

    const pr_number = context.payload.pull_request.number;
    const repo = new github.GitHub(github_token);
    const pr_comment = repo.issues.createComment({
      ...context.repo,
      issue_number: pr_number,
      body: comment
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();