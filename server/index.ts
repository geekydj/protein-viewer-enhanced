import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    // Keep original filename but ensure .pdb extension
    const name = path.parse(file.originalname).name;
    cb(null, `${name}-${Date.now()}.pdb`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'text/plain' || file.originalname.endsWith('.pdb')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDB files are allowed'));
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));
app.use(express.static(path.join(__dirname, '..')));

// Routes
app.post('/api/upload', upload.single('pdb'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileInfo = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      uploadDate: new Date().toISOString(),
      url: `/uploads/${req.file.filename}`
    };

    console.log(`Uploaded: ${req.file.originalname} -> ${req.file.filename}`);
    res.json({ 
      message: 'File uploaded successfully', 
      file: fileInfo 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.get('/api/files', (_req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir)
      .filter(file => file.endsWith('.pdb'))
      .map(filename => {
        const filePath = path.join(uploadsDir, filename);
        const stats = fs.statSync(filePath);
        
        return {
          filename,
          size: stats.size,
          uploadDate: stats.mtime.toISOString(),
          url: `/uploads/${filename}`
        };
      })
      .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

    res.json({ files });
  } catch (error) {
    console.error('Files listing error:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

app.get('/api/files/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ 
      filename,
      content,
      size: content.length 
    });
  } catch (error) {
    console.error('File read error:', error);
    res.status(500).json({ error: 'Failed to read file' });
  }
});

app.listen(PORT, () => {
  console.log(`🧬 Protein Viewer Server running on http://localhost:${PORT}`);
  console.log(`📁 Upload directory: ${uploadsDir}`);
});