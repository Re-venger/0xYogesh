import { exec } from 'child_process';
import { NextResponse } from 'next/server';
import path from 'path';

const REPO_DIR = path.join(process.cwd(), 'path/to/your/local/repo');
const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function POST(req) {
  const payload = await req.json();
  const ref = payload.ref;

  if (ref === 'refs/heads/main') {
    // Pull the latest changes from GitHub
    exec(`git -C ${REPO_DIR} pull`, (err) => {
      if (err) {
        console.error('Error pulling repo:', err);
        return NextResponse.json({ error: 'Failed to pull repository' }, { status: 500 });
      }

      // Sync files to content directory
      exec(`rsync -av --delete ${REPO_DIR}/ ${CONTENT_DIR}`, (err) => {
        if (err) {
          console.error('Error syncing files:', err);
          return NextResponse.json({ error: 'Failed to sync files' }, { status: 500 });
        }
      });
    });
  }

  return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
}
