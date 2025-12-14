#!/usr/bin/env node

/**
 * Script to get latest commit information for build-time environment variables
 * Usage: node scripts/get-commit-info.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Get last 3 commits
  const commitsOutput = execSync('git log -3 --pretty=format:"%H|%s|%an|%aI"', { encoding: 'utf-8' }).trim();
  
  const commits = commitsOutput.split('\n').map(line => {
    const [hash, message, author, date] = line.split('|');
    return {
      hash: hash.trim(),
      shortHash: hash.trim().substring(0, 7),
      message: message.trim(),
      author: author.trim(),
      date: date.trim()
    };
  });
  
  // Get latest commit for backward compatibility
  const latestCommit = commits[0];
  
  // Create JSON string for commits (escape quotes)
  const commitsJson = JSON.stringify(commits).replace(/"/g, '\\"');
  
  // Create .env.local file with commit info
  const envContent = `# Auto-generated commit info (do not edit manually)
NEXT_PUBLIC_COMMIT_HASH=${latestCommit.hash}
NEXT_PUBLIC_COMMIT_MESSAGE=${latestCommit.message.replace(/'/g, "\\'")}
NEXT_PUBLIC_COMMIT_AUTHOR=${latestCommit.author}
NEXT_PUBLIC_COMMIT_DATE=${latestCommit.date}
NEXT_PUBLIC_COMMITS_HISTORY="${commitsJson}"
`;
  
  const envPath = path.join(process.cwd(), '.env.local');
  fs.writeFileSync(envPath, envContent, 'utf-8');
  
  console.log('✓ Commit info saved to .env.local');
  console.log(`  Latest: ${latestCommit.shortHash} - ${latestCommit.message.substring(0, 50)}...`);
  console.log(`  Total commits: ${commits.length}`);
} catch (error) {
  console.warn('⚠ Could not get commit info:', error.message);
  console.warn('  Using fallback values');
  
  // Create .env.local with fallback values
  const envPath = path.join(process.cwd(), '.env.local');
  const envContent = `# Auto-generated commit info (fallback values)
NEXT_PUBLIC_COMMIT_HASH=main
NEXT_PUBLIC_COMMIT_MESSAGE=Latest version
NEXT_PUBLIC_COMMIT_AUTHOR=gurkanfikretgunak
NEXT_PUBLIC_COMMIT_DATE=${new Date().toISOString()}
`;
  
  fs.writeFileSync(envPath, envContent, 'utf-8');
}

