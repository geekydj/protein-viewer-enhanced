import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm();
  
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }

    const file = files.pdb;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      // For Vercel, we'll just return file info without actually storing
      // since Vercel functions are stateless
      const fileInfo = {
        filename: file.originalFilename || 'uploaded-file.pdb',
        originalName: file.originalFilename,
        size: file.size,
        uploadDate: new Date().toISOString(),
        url: `/uploads/${file.originalFilename}`
      };

      console.log(`File processed: ${file.originalFilename}`);
      res.status(200).json({ 
        message: 'File uploaded successfully', 
        file: fileInfo 
      });
    } catch (error) {
      console.error('Upload processing error:', error);
      res.status(500).json({ error: 'Upload processing failed' });
    }
  });
}