export interface ProofInput {
  contentHash: string;
  generator: string;
  prompt: string;
  parentProofId: string;
}

export interface Proof {
  type: string;
  root: string;
  leaves: string[];
  signature: string;
}

export interface Anchor {
  fileId: string;
  hcsTxId: string;
  consensusTimestamp: string;
  contractAnchorTxId?: string;
}

export interface Verification {
  verified: boolean;
  reason: string;
}

export interface Metadata {
    agentId: string;
    proofMeshVersion: string;
    hashingSchema: string;
    generator: string;
    prompt?: string;
    parentProofId?: string;
}

export interface ProofReceipt {
  status: 'success' | 'fail';
  proofId: string;
  inputHash: string;
  proof: Proof;
  anchor: Anchor;
  verification: Verification;
  metadata: Metadata;
}
