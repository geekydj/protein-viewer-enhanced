// Generate a large protein structure with thousands of atoms
function generateLargeProtein() {
    let pdbContent = `HEADER    LARGE PROTEIN COMPLEX                  01-JAN-24   LARGE             
TITLE     LARGE HEMOGLOBIN-LIKE PROTEIN COMPLEX                           
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
        // Each chain has 50 residues
        for (let resNum = 1; resNum <= 50; resNum++) {
            const aminoAcid = aminoAcids[Math.floor(Math.random() * aminoAcids.length)];
            
            // Generate atoms for each residue (8-12 atoms per residue)
            const atomsPerResidue = Math.floor(Math.random() * 5) + 8;
            
            for (let atomIndex = 0; atomIndex < atomsPerResidue; atomIndex++) {
                const atomName = atomNames[Math.floor(Math.random() * atomNames.length)];
                const element = elements[Math.floor(Math.random() * elements.length)];
                
                // Create realistic 3D coordinates spread across space
                const baseX = chainIndex * 15 - 40; // Spread chains apart
                const baseY = resNum * 0.8 - 25;    // Spread residues along chain
                const baseZ = Math.sin(resNum * 0.3) * 10; // Create helical structure
                
                const x = baseX + (Math.random() - 0.5) * 8;
                const y = baseY + (Math.random() - 0.5) * 8;
                const z = baseZ + (Math.random() - 0.5) * 8;
                
                pdbContent += `ATOM${atomId.toString().padStart(7)}  ${atomName.padEnd(4)}${aminoAcid} ${chainId}${resNum.toString().padStart(4)}    ${x.toFixed(3).padStart(8)}${y.toFixed(3).padStart(8)}${z.toFixed(3).padStart(8)}  1.00 20.00           ${element.padEnd(2)}\n`;
                
                atomId++;
            }
        }
    });

    pdbContent += 'END\n';
    console.log(`Generated protein with ${atomId - 1} atoms`);
    return pdbContent;
}

// Export for use
if (typeof module !== 'undefined') {
    module.exports = generateLargeProtein;
} else {
    window.generateLargeProtein = generateLargeProtein;
}