import simpleGit, { SimpleGit } from 'simple-git';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export class GitFusionPlugin {
  private git: SimpleGit;
  private gitWorkTree?: string;

  constructor(gitWorkTree?: string) {
    this.git = simpleGit(gitWorkTree);
    this.gitWorkTree = gitWorkTree;
  }

  private async getLastCommitInfo() {
    try {
      const [hash, author, date, message] = await Promise.all([
        this.git.raw(['rev-parse', 'HEAD']),
        this.git.raw(['log', '-1', '--pretty=format:%an']),
        this.git.raw(['log', '-1', '--pretty=format:%ai']),
        this.git.raw(['log', '-1', '--pretty=format:%s']),
      ]);
      return {
        hash: hash.trim(),
        author: author.trim(),
        date: new Date(date.trim()).toISOString(),
        message: message.trim(),
      };
    } catch (error) {
      console.error('Error getting last commit info:', error);
      throw error;
    }
  }

  private getCurrentBranch() {
    return this.git.branchLocal().then((summary) => summary.current);
  }

  private async createGitFusionFile() {
    try {
      const { hash, author, date, message } = await this.getLastCommitInfo();
      const branch = await this.getCurrentBranch();

      const content = `LAST_COMMIT_ID=${hash}\nLAST_COMMIT_AUTHOR=${author}\nLAST_COMMIT_TIMESTAMP=${date}\nLAST_COMMIT_MESSAGE=${message}\nCURRENT_BRANCH=${branch}`;

      const filePath = path.resolve('.GIT_FUSION');
      await fs.writeFile(filePath, content, () => { });

      console.log('[GIT FUSION] found following properties');
      console.log(content);

      console.log('.GIT_FUSION file created successfully.');
    } catch (error) {
      console.error('Error creating .GIT_FUSION file:', error);
      throw error;
    }
  }

  private async createGitFusionFileInJson() {
    try {
      const { hash, author, date, message } = await this.getLastCommitInfo();
      const branch = await this.getCurrentBranch();

      const filePath = path.resolve('.GIT_FUSION');

      const gitInfo = {
        gitLastCommit: { hash, author, date, message, },
        branch,
      }

      await fs.writeFile(filePath, JSON.stringify(gitInfo), () => { });

      console.log('[GIT FUSION] found following properties');
      this.printKeyValuePairs(gitInfo);

      console.log('[GIT_FUSION] file created successfully.');
    } catch (error) {
      console.error('[GIT_FUSION] Error creating .GIT_FUSION file:', error);
      throw error;
    }
  }

  private printKeyValuePairs(obj: object, prefix: string = 'git'): void {
    for (const [key, value] of Object.entries(obj)) {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        this.printKeyValuePairs(value, newPrefix);
      } else {
        console.log(`${newPrefix}=${value}`);
      }
    }
  }

  public async createFile() {
    await this.createGitFusionFile();
  }

  public async createJsonFile() {
    await this.createGitFusionFileInJson();
  }
}