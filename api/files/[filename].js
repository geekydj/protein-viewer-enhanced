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
    
    // Function to generate large protein structure
    function generateLargeProtein() {
      let content = `HEADER    LARGE PROTEIN COMPLEX                  01-JAN-24   LARGE             
TITLE     LARGE HEMOGLOBIN-LIKE PROTEIN COMPLEX (3000+ ATOMS)             
COMPND    MOL_ID: 1;
COMPND   2 MOLECULE: LARGE PROTEIN COMPLEX;
COMPND   3 CHAIN: A, B, C, D, E, F;
SOURCE    MOL_ID: 1;
SOURCE   2 ORGANISM_SCIENTIFIC: HOMO SAPIENS;
SOURCE   3 ORGANISM_COMMON: HUMAN;
`;

      let atomId = 1;
      const chains = ['A', 'B', 'C', 'D', 'E', 'F'];
      const aminoAcids = ['ALA', 'VAL', 'LEU', 'ILE', 'PHE', 'TRP', 'TYR', 'ASP', 'GLU', 'LYS', 'ARG', 'SER', 'THR', 'ASN', 'GLN', 'CYS', 'GLY', 'PRO', 'HIS', 'MET'];
      const elements = ['C', 'N', 'O', 'S'];
      const atomNames = ['N', 'CA', 'C', 'O', 'CB', 'CG', 'CD', 'CE', 'NZ', 'OG', 'SG'];

      // Generate multiple protein chains
      chains.forEach((chainId, chainIndex) => {
        // Each chain has 80 residues
        for (let resNum = 1; resNum <= 80; resNum++) {
          const aminoAcid = aminoAcids[Math.floor(Math.random() * aminoAcids.length)];
          
          // Generate atoms for each residue (8-12 atoms per residue)
          const atomsPerResidue = Math.floor(Math.random() * 5) + 8;
          
          for (let atomIndex = 0; atomIndex < atomsPerResidue; atomIndex++) {
            const atomName = atomNames[Math.floor(Math.random() * atomNames.length)];
            const element = elements[Math.floor(Math.random() * elements.length)];
            
            // Create realistic 3D coordinates spread across space
            const baseX = chainIndex * 20 - 50; // Spread chains apart
            const baseY = resNum * 1.2 - 40;    // Spread residues along chain
            const baseZ = Math.sin(resNum * 0.2) * 15 + Math.cos(chainIndex) * 10; // Create complex 3D structure
            
            const x = baseX + (Math.random() - 0.5) * 12;
            const y = baseY + (Math.random() - 0.5) * 12;
            const z = baseZ + (Math.random() - 0.5) * 12;
            
            const atomLine = `ATOM${atomId.toString().padStart(7, ' ')}  ${atomName.padEnd(4)}${aminoAcid} ${chainId}${resNum.toString().padStart(4, ' ')}    ${x.toFixed(3).padStart(8, ' ')}${y.toFixed(3).padStart(8, ' ')}${z.toFixed(3).padStart(8, ' ')}  1.00 20.00           ${element.padEnd(2)}`;
            content += atomLine + '\n';
            
            atomId++;
          }
        }
      });

      content += 'END\n';
      return content;
    }

    if (filename === 'hemoglobin_1HHO.pdb') {
      // Generate large protein structure with ~3000 atoms
      pdbContent = generateLargeProtein();
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