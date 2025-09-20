// Use relative URLs since Vite will proxy to the server
const API_BASE = '';

export interface ProteinFile {
  filename: string;
  originalName?: string;
  size: number;
  uploadDate: string;
  url: string;
}

export interface UploadResponse {
  message: string;
  file: ProteinFile;
}

export interface FilesResponse {
  files: ProteinFile[];
}

export interface FileContentResponse {
  filename: string;
  content: string;
  size: number;
}

export interface ProteinInfo {
  pdbId?: string;
  title?: string;
  description?: string;
  authors?: string[];
  releaseDate?: string;
  resolution?: number;
  experimentalMethod?: string;
  organism?: string;
  molecularWeight?: number;
  keywords?: string[];
  classification?: string;
}

export class ProteinAPI {
  static async uploadFile(file: File): Promise<UploadResponse> {
    console.log('🔄 Starting upload for file:', file.name, file.size, file.type);
    
    const formData = new FormData();
    formData.append('pdb', file);
    
    console.log('📤 Sending request to:', `${API_BASE}/api/upload`);

    try {
      const response = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formData
      });
      
      console.log('📨 Response received:', response.status, response.statusText);

      if (!response.ok) {
        let errorMessage = 'Upload failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
          console.error('❌ Server error:', errorData);
        } catch {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
          console.error('❌ Server error text:', errorText);
        }
        throw new Error(`${response.status}: ${errorMessage}`);
      }

      const result = await response.json();
      console.log('✅ Upload successful:', result);
      return result;
    } catch (error) {
      console.error('❌ Upload exception:', error);
      throw error;
    }
  }

  static async getFiles(): Promise<FilesResponse> {
    const response = await fetch(`${API_BASE}/api/files`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }

    return response.json();
  }

  static async getFileContent(filename: string): Promise<FileContentResponse> {
    const response = await fetch(`${API_BASE}/api/files/${filename}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch file content');
    }

    return response.json();
  }

  static getFileUrl(filename: string): string {
    return `${API_BASE}/uploads/${filename}`;
  }

  static async fetchProteinInfo(pdbId: string): Promise<ProteinInfo> {
    try {
      // Clean PDB ID (remove file extension, take first 4 chars)
      const cleanPdbId = pdbId.replace(/\.(pdb|PDB)$/, '').substring(0, 4).toUpperCase();
      
      const response = await fetch(`https://data.rcsb.org/rest/v1/core/entry/${cleanPdbId}`);
      if (!response.ok) {
        throw new Error(`PDB API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      return {
        pdbId: cleanPdbId,
        title: data.struct?.title || 'Unknown Structure',
        description: data.struct?.pdbx_descriptor || '',
        authors: data.audit_author?.map((author: any) => author.name) || [],
        releaseDate: data.rcsb_accession_info?.initial_release_date || '',
        resolution: data.rcsb_entry_info?.resolution_combined?.[0] || undefined,
        experimentalMethod: data.exptl?.[0]?.method || 'Unknown',
        organism: data.rcsb_entry_info?.selected_polymer_entity_types || '',
        molecularWeight: data.rcsb_entry_info?.molecular_weight || undefined,
        keywords: data.struct_keywords?.pdbx_keywords?.split(', ') || [],
        classification: data.struct_keywords?.text || ''
      };
    } catch (error) {
      console.warn('Failed to fetch PDB info:', error);
      // Return basic info with extracted PDB ID if possible
      const cleanPdbId = pdbId.replace(/\.(pdb|PDB)$/, '').substring(0, 4).toUpperCase();
      return {
        pdbId: cleanPdbId.length === 4 ? cleanPdbId : undefined,
        title: pdbId,
        description: 'Protein structure file'
      };
    }
  }
}
