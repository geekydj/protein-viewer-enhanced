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
    // Return sample PDB files from the public directory
    const sampleFiles = [
      {
        filename: '1ZNI.pdb',
        size: 45231,
        uploadDate: new Date('2024-01-15').toISOString(),
        url: '/1ZNI.pdb'
      },
      {
        filename: 'hemoglobin_1HHO.pdb',
        size: 238330,
        uploadDate: new Date('2024-01-14').toISOString(),
        url: '/hemoglobin_1HHO.pdb'
      },
      {
        filename: 'test-protein.pdb',
        size: 12450,
        uploadDate: new Date('2024-01-13').toISOString(),
        url: '/test-protein.pdb'
      },
      {
        filename: 'simple-test.pdb',
        size: 8920,
        uploadDate: new Date('2024-01-12').toISOString(),
        url: '/simple-test.pdb'
      },
      {
        filename: 'quicktest.pdb',
        size: 5640,
        uploadDate: new Date('2024-01-11').toISOString(),
        url: '/quicktest.pdb'
      }
    ];

    res.status(200).json({ files: sampleFiles });
  } catch (error) {
    console.error('Files listing error:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
}