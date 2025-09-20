import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename } = req.query;
    
    if (!filename || !filename.endsWith('.pdb')) {
      return res.status(400).json({ error: 'Invalid filename' });
    }

    // For demo purposes, return sample PDB content
    // In a real deployment, you'd read from a database or cloud storage
    const samplePDBContent = `HEADER    OXYGEN STORAGE/TRANSPORT           20-MAY-98   1HHO              
TITLE     HUMAN DEOXYHEMOGLOBIN                                           
COMPND    MOL_ID: 1;                                                      
COMPND   2 MOLECULE: HEMOGLOBIN;                                          
COMPND   3 CHAIN: A, B;                                                   
COMPND   4 FRAGMENT: ALPHA CHAIN;                                         
SOURCE    MOL_ID: 1;                                                      
SOURCE   2 ORGANISM_SCIENTIFIC: HOMO SAPIENS;                            
SOURCE   3 ORGANISM_COMMON: HUMAN                                         
ATOM      1  N   VAL A   1      20.154  11.200   5.251  1.00 49.05           N  
ATOM      2  CA  VAL A   1      19.547  10.365   4.200  1.00 43.14           C  
ATOM      3  C   VAL A   1      18.375   9.613   4.796  1.00 24.80           C  
ATOM      4  O   VAL A   1      17.333  10.121   5.183  1.00 37.68           O  
ATOM      5  CB  VAL A   1      19.024  11.209   3.026  1.00 72.12           C  
END`;

    res.status(200).json({ 
      filename,
      content: samplePDBContent,
      size: samplePDBContent.length 
    });
  } catch (error) {
    console.error('File read error:', error);
    res.status(500).json({ error: 'Failed to read file' });
  }
}