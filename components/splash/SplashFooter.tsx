'use client';

import { Badge } from '@/components/ui/badge';
import { WifiOff, GitCommit, Calendar, User, Database, Shield, CloudOff } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CommitInfo {
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

export default function SplashFooter() {
  const repoUrl = 'https://github.com/gurkanfikretgunak/masterfabric-thermal-printer';
  const authorName = 'gurkanfikretgunak';
  const authorUrl = `https://github.com/${authorName}`;
  
  const [commitInfo, setCommitInfo] = useState<CommitInfo | null>(null);
  const [commitsHistory, setCommitsHistory] = useState<CommitInfo[]>([]);
  
  useEffect(() => {
    // Try to get commit info from environment variable first (set at build time)
    const envHash = process.env.NEXT_PUBLIC_COMMIT_HASH;
    const envMessage = process.env.NEXT_PUBLIC_COMMIT_MESSAGE;
    const envAuthor = process.env.NEXT_PUBLIC_COMMIT_AUTHOR;
    const envDate = process.env.NEXT_PUBLIC_COMMIT_DATE;
    const envCommitsHistory = process.env.NEXT_PUBLIC_COMMITS_HISTORY;
    
    if (envHash && envHash !== 'main' && envHash.length >= 7) {
      const latestCommit: CommitInfo = {
        hash: envHash,
        shortHash: envHash.substring(0, 7),
        message: envMessage || 'Latest commit',
        author: envAuthor || authorName,
        date: envDate || new Date().toISOString(),
        url: `${repoUrl}/commit/${envHash}`,
      };
      
      setCommitInfo(latestCommit);
      
      // Parse commits history if available
      if (envCommitsHistory) {
        try {
          const parsedCommits = JSON.parse(envCommitsHistory.replace(/\\"/g, '"'));
          const commitsWithUrls = parsedCommits.map((commit: any) => ({
            hash: commit.hash,
            shortHash: commit.shortHash,
            message: commit.message,
            author: commit.author,
            date: commit.date,
            url: `${repoUrl}/commit/${commit.hash}`,
          }));
          setCommitsHistory(commitsWithUrls);
        } catch (e) {
          // If parsing fails, just use the latest commit
          setCommitsHistory([latestCommit]);
        }
      } else {
        setCommitsHistory([latestCommit]);
      }
    } else {
      // Fallback: show main branch info
      const fallbackCommit: CommitInfo = {
        hash: 'main',
        shortHash: 'main',
        message: 'Latest version',
        author: authorName,
        date: new Date().toISOString(),
        url: `${repoUrl}`,
      };
      setCommitInfo(fallbackCommit);
      setCommitsHistory([fallbackCommit]);
    }
  }, [authorName, repoUrl]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      
      // Show relative time like GitHub
      if (diffMins < 1) return 'just now';
      if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
      if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
      if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
      
      // Otherwise show formatted date
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full max-w-md border-t border-border pt-4 pb-2">
      <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
        {/* Commit Hash with GitHub-styled Card - First */}
        {commitInfo && (
          <>
          <div className="relative group inline-flex items-center">
            <a
              href={commitInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors font-mono flex items-center gap-1"
              title={`Commit: ${commitInfo.shortHash}\n${commitInfo.message}\nAuthor: ${commitInfo.author}`}
            >
              <GitCommit className="h-3 w-3" />
              {commitInfo.shortHash}
            </a>
            {/* GitHub-styled Commit Card - Shown on hover */}
            <div className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-96 opacity-0 group-hover:opacity-100 hover:opacity-100 pointer-events-none group-hover:pointer-events-auto hover:pointer-events-auto transition-opacity duration-200 z-50">
              {/* Invisible bridge to prevent hover gap */}
              <div className="absolute top-full left-0 right-0 h-4 -mb-4"></div>
              <div className="bg-white border border-gray-300 rounded-lg shadow-2xl overflow-hidden">
                {/* Card Header */}
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <GitCommit className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-xs font-semibold text-gray-900">Recent Commits</span>
                    <span className="ml-auto text-xs text-gray-500">
                      {commitsHistory.length > 0 ? `${commitsHistory.length} commits` : ''}
                    </span>
                  </div>
                </div>
                
                {/* Card Body - Commits List */}
                <div className="px-4 py-3 space-y-0 bg-white max-h-96 overflow-y-auto">
                  {commitsHistory.length > 0 ? (
                    commitsHistory.map((commit, index) => (
                      <div
                        key={commit.hash}
                        className={`py-2.5 ${index !== commitsHistory.length - 1 ? 'border-b border-gray-100' : ''}`}
                      >
                        <a
                          href={commit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group/item hover:bg-gray-50 -mx-2 px-2 rounded transition-colors pointer-events-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Commit Hash and Message */}
                          <div className="flex items-start gap-2 mb-1.5">
                            <span className="text-xs font-mono text-blue-600 group-hover/item:text-blue-800 group-hover/item:underline flex-shrink-0">
                              {commit.shortHash}
                            </span>
                            <p className="text-sm text-gray-900 leading-relaxed break-words flex-1">
                              {commit.message}
                            </p>
                          </div>
                          
                          {/* Commit Details */}
                          <div className="flex flex-wrap items-center gap-3 mt-1.5">
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <User className="h-3 w-3 text-gray-500" />
                              <span className="font-medium text-gray-700">{commit.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <Calendar className="h-3 w-3 text-gray-500" />
                              <span className="text-gray-600">{formatDate(commit.date)}</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="py-2">
                      <p className="text-sm text-gray-500">No commit history available</p>
                    </div>
                  )}
                </div>
                
                {/* Card Footer */}
                <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
                  <a
                    href={`${repoUrl}/commits/main`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium inline-flex items-center gap-1 pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View all commits on GitHub
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
              {/* Arrow pointing to commit hash */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                <div className="border-8 border-transparent border-t-gray-300"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-white"></div>
              </div>
            </div>
          </div>
          </>
        )}
        {commitInfo && <span>•</span>}
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          source
        </a>
        <span>•</span>
        <a
          href={authorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          {authorName}
        </a>
        <span>•</span>
        {/* Offline Badge with GitHub-styled Card */}
        <div className="relative group inline-flex items-center">
          <Badge 
            variant="outline" 
            className="cursor-help flex items-center gap-1.5 hover:bg-accent transition-colors"
            title="This is a fully offline project. It does not connect to any external services, APIs, or servers. All data is stored locally on your device."
          >
            <WifiOff className="h-3 w-3" />
            <span>Offline</span>
          </Badge>
          {/* GitHub-styled Offline Card - Shown on hover */}
          <div className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 opacity-0 group-hover:opacity-100 hover:opacity-100 pointer-events-none group-hover:pointer-events-auto hover:pointer-events-auto transition-opacity duration-200 z-50">
            {/* Invisible bridge to prevent hover gap */}
            <div className="absolute top-full left-0 right-0 h-4 -mb-4"></div>
            <div className="bg-white border border-gray-300 rounded-lg shadow-2xl overflow-hidden">
              {/* Card Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <CloudOff className="h-3.5 w-3.5 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-900">Offline Project</span>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="px-4 py-3 space-y-3 bg-white">
                {/* Main Description */}
                <div>
                  <p className="text-sm text-gray-900 leading-relaxed">
                    This is a fully offline project. It does not connect to any external services, APIs, or servers.
                  </p>
                </div>
                
                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <div className="flex items-start gap-2 text-xs text-gray-700">
                    <Database className="h-3.5 w-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>All data is stored locally on your device using IndexedDB</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-700">
                    <Shield className="h-3.5 w-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>No network requests or external API calls</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-700">
                    <WifiOff className="h-3.5 w-3.5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span>Works completely offline without internet connection</span>
                  </div>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="bg-gray-50 border-t border-gray-200 px-4 py-2">
                <p className="text-xs text-gray-600">
                  <span className="font-medium text-gray-700">Privacy First:</span> Your data never leaves your device
                </p>
              </div>
            </div>
            {/* Arrow pointing to offline badge */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="border-8 border-transparent border-t-gray-300"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
