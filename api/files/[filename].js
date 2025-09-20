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
TITLE     HUMAN DEOXYHEMOGLOBIN ALPHA CHAIN                               
COMPND    MOL_ID: 1;
COMPND   2 MOLECULE: HEMOGLOBIN ALPHA CHAIN;
COMPND   3 CHAIN: A, B, C, D;
SOURCE    MOL_ID: 1;
SOURCE   2 ORGANISM_SCIENTIFIC: HOMO SAPIENS;
SOURCE   3 ORGANISM_COMMON: HUMAN;
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
ATOM     22  N   ALA A   4      12.950   5.056   3.106  1.00 11.29           N  
ATOM     23  CA  ALA A   4      12.353   3.729   3.172  1.00 10.70           C  
ATOM     24  C   ALA A   4      11.052   3.826   4.002  1.00 10.45           C  
ATOM     25  O   ALA A   4      10.854   4.626   4.912  1.00 10.73           O  
ATOM     26  CB  ALA A   4      12.017   3.189   1.786  1.00 10.64           C  
ATOM     27  N   ASP A   5      10.150   2.916   3.773  1.00 10.20           N  
ATOM     28  CA  ASP A   5       8.837   2.883   4.457  1.00 10.14           C  
ATOM     29  C   ASP A   5       8.018   1.665   4.050  1.00 10.08           C  
ATOM     30  O   ASP A   5       8.171   1.051   3.003  1.00 10.19           O  
ATOM     31  CB  ASP A   5       8.012   4.160   4.285  1.00 10.21           C  
ATOM     32  CG  ASP A   5       8.574   5.388   4.846  1.00 10.37           C  
ATOM     33  OD1 ASP A   5       9.650   5.334   5.472  1.00 10.48           O  
ATOM     34  OD2 ASP A   5       8.028   6.477   4.723  1.00 10.51           O  
ATOM     35  N   LYS A   6       7.058   1.455   4.839  1.00 10.02           N  
ATOM     36  CA  LYS A   6       6.190   0.304   4.658  1.00  9.96           C  
ATOM     37  C   LYS A   6       4.849   0.567   5.354  1.00 10.00           C  
ATOM     38  O   LYS A   6       4.633   1.493   6.131  1.00 10.12           O  
ATOM     39  CB  LYS A   6       5.872  -0.054   3.198  1.00  9.91           C  
ATOM     40  CG  LYS A   6       7.099  -0.387   2.376  1.00  9.82           C  
ATOM     41  CD  LYS A   6       6.772  -0.746   0.932  1.00  9.70           C  
ATOM     42  CE  LYS A   6       8.008  -1.071   0.116  1.00  9.58           C  
ATOM     43  NZ  LYS A   6       7.698  -1.427  -1.300  1.00  9.44           N  
ATOM     44  N   THR A   7       3.923  -0.303   5.142  1.00 10.01           N  
ATOM     45  CA  THR A   7       2.601  -0.173   5.751  1.00 10.02           C  
ATOM     46  C   THR A   7       1.579  -1.147   5.197  1.00 10.06           C  
ATOM     47  O   THR A   7       1.734  -1.806   4.174  1.00 10.12           O  
ATOM     48  CB  THR A   7       2.045   1.239   5.677  1.00  9.99           C  
ATOM     49  OG1 THR A   7       3.040   2.161   6.089  1.00  9.95           O  
ATOM     50  CG2 THR A   7       0.820   1.372   6.558  1.00  9.92           C  
ATOM     51  FE  HEM A   8      -2.890   3.146  -0.431  1.00 18.93          FE  
ATOM     52  N   GLY A   9      -5.231   4.890  -2.876  1.00 25.42           N  
ATOM     53  CA  GLY A   9      -6.384   5.478  -3.579  1.00 26.71           C  
ATOM     54  C   GLY A   9      -7.690   4.730  -3.687  1.00 27.82           C  
ATOM     55  O   GLY A   9      -8.009   3.901  -2.850  1.00 27.99           O  
ATOM     56  N   PHE B   1      -8.417   4.932  -4.768  1.00 28.76           N  
ATOM     57  CA  PHE B   1      -9.671   4.225  -5.003  1.00 29.58           C  
ATOM     58  C   PHE B   1     -10.868   4.982  -4.459  1.00 30.22           C  
ATOM     59  O   PHE B   1     -10.801   6.120  -4.006  1.00 30.35           O  
ATOM     60  CB  PHE B   1      -9.884   3.964  -6.494  1.00 29.70           C  
ATOM     61  CG  PHE B   1      -8.863   3.136  -7.208  1.00 29.74           C  
ATOM     62  CD1 PHE B   1      -8.639   1.803  -6.924  1.00 29.74           C  
ATOM     63  CD2 PHE B   1      -8.095   3.649  -8.234  1.00 29.74           C  
ATOM     64  CE1 PHE B   1      -7.700   1.055  -7.594  1.00 29.75           C  
ATOM     65  CE2 PHE B   1      -7.154   2.910  -8.910  1.00 29.75           C  
ATOM     66  CZ  PHE B   1      -6.945   1.580  -8.612  1.00 29.75           C  
ATOM     67  N   VAL B   2     -12.029   4.418  -4.488  1.00 30.86           N  
ATOM     68  CA  VAL B   2     -13.267   5.013  -3.982  1.00 31.38           C  
ATOM     69  C   VAL B   2     -14.453   4.053  -4.022  1.00 31.75           C  
ATOM     70  O   VAL B   2     -14.371   2.856  -4.294  1.00 31.81           O  
ATOM     71  CB  VAL B   2     -13.690   6.278  -4.747  1.00 31.32           C  
ATOM     72  CG1 VAL B   2     -14.959   6.900  -4.165  1.00 31.27           C  
ATOM     73  CG2 VAL B   2     -12.586   7.316  -4.842  1.00 31.28           C  
ATOM     74  N   ASN B   3     -15.624   4.523  -3.748  1.00 32.05           N  
ATOM     75  CA  ASN B   3     -16.838   3.721  -3.751  1.00 32.25           C  
ATOM     76  C   ASN B   3     -18.080   4.464  -3.260  1.00 32.35           C
ATOM     77  O   ASN B   3     -18.112   5.661  -3.023  1.00 32.37           O  
ATOM     78  CB  ASN B   3     -17.145   3.186  -5.147  1.00 32.23           C  
ATOM     79  CG  ASN B   3     -16.050   2.303  -5.708  1.00 32.17           C  
ATOM     80  OD1 ASN B   3     -15.178   1.774  -5.038  1.00 32.13           O  
ATOM     81  ND2 ASN B   3     -16.053   2.196  -7.022  1.00 32.11           N  
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