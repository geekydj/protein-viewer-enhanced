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

    // Return proper PDB content based on filename
    let pdbContent = '';
    
    if (filename === 'hemoglobin_1HHO.pdb') {
      pdbContent = `HEADER    OXYGEN STORAGE/TRANSPORT           20-MAY-98   1HHO              
TITLE     HUMAN DEOXYHEMOGLOBIN                                           
COMPND    MOL_ID: 1;                                                      
COMPND   2 MOLECULE: HEMOGLOBIN;                                          
COMPND   3 CHAIN: A, B;                                                   
SOURCE    MOL_ID: 1;                                                      
SOURCE   2 ORGANISM_SCIENTIFIC: HOMO SAPIENS;                            
ATOM      1  N   VAL A   1      20.154  11.200   5.251  1.00 49.05           N  
ATOM      2  CA  VAL A   1      19.547  10.365   4.200  1.00 43.14           C  
ATOM      3  C   VAL A   1      18.375   9.613   4.796  1.00 24.80           C  
ATOM      4  O   VAL A   1      17.333  10.121   5.183  1.00 37.68           O  
ATOM      5  CB  VAL A   1      19.024  11.209   3.026  1.00 72.12           C  
ATOM      6  CG1 VAL A   1      17.886  12.038   3.584  1.00 72.12           C  
ATOM      7  CG2 VAL A   1      19.976  12.041   2.253  1.00 72.12           C  
ATOM      8  N   LEU A   2      18.452   8.321   4.833  1.00 21.19           N  
ATOM      9  CA  LEU A   2      17.389   7.439   5.387  1.00 18.45           C  
ATOM     10  C   LEU A   2      16.251   7.188   4.388  1.00 15.55           C  
ATOM     11  O   LEU A   2      16.455   6.849   3.225  1.00 17.31           O  
ATOM     12  CB  LEU A   2      17.971   6.126   5.886  1.00 20.67           C  
ATOM     13  CG  LEU A   2      19.108   6.312   6.904  1.00 21.55           C  
ATOM     14  CD1 LEU A   2      19.637   4.968   7.369  1.00 22.27           C  
ATOM     15  CD2 LEU A   2      18.549   7.181   8.025  1.00 22.86           C  
ATOM     16  N   SER A   3      15.041   7.362   4.803  1.00 13.77           N  
ATOM     17  CA  SER A   3      13.865   7.128   3.967  1.00 12.86           C  
ATOM     18  C   SER A   3      13.307   5.741   4.181  1.00 11.99           C  
ATOM     19  O   SER A   3      13.135   5.342   5.331  1.00 12.05           O  
ATOM     20  CB  SER A   3      12.778   8.166   4.239  1.00 13.25           C  
ATOM     21  OG  SER A   3      13.269   9.475   4.381  1.00 14.74           O  
END`;
    } else {
      // Default simple protein structure
      pdbContent = `HEADER    TEST PROTEIN                           01-JAN-24   TEST              
TITLE     SIMPLE TEST PROTEIN                                             
ATOM      1  N   ALA A   1       0.000   0.000   0.000  1.00 20.00           N  
ATOM      2  CA  ALA A   1       1.458   0.000   0.000  1.00 20.00           C  
ATOM      3  C   ALA A   1       2.009   1.421   0.000  1.00 20.00           C  
ATOM      4  O   ALA A   1       1.328   2.417   0.000  1.00 20.00           O  
ATOM      5  CB  ALA A   1       1.978  -0.774   1.198  1.00 20.00           C  
ATOM      6  N   GLY A   2       3.324   1.492   0.000  1.00 20.00           N  
ATOM      7  CA  GLY A   2       3.995   2.778   0.000  1.00 20.00           C  
ATOM      8  C   GLY A   2       5.497   2.620   0.000  1.00 20.00           C  
ATOM      9  O   GLY A   2       6.179   1.601   0.000  1.00 20.00           O  
ATOM     10  N   VAL A   3       6.001   3.821   0.000  1.00 20.00           N  
ATOM     11  CA  VAL A   3       7.422   4.016   0.000  1.00 20.00           C  
ATOM     12  C   VAL A   3       8.016   5.417   0.000  1.00 20.00           C  
ATOM     13  O   VAL A   3       7.349   6.441   0.000  1.00 20.00           O  
ATOM     14  CB  VAL A   3       7.955   3.241   1.198  1.00 20.00           C  
ATOM     15  CG1 VAL A   3       9.457   3.436   1.198  1.00 20.00           C  
ATOM     16  CG2 VAL A   3       7.435   3.690   2.549  1.00 20.00           C  
END`;
    }
    
    const samplePDBContent = pdbContent;

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