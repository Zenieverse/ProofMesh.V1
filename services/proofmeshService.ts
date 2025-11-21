import { ProofReceipt, ProofInput } from '../types';

async function sha256(str: string): Promise<string> {
  const textAsBuffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', textAsBuffer);
  // FIX: Corrected typo from UintArray to Uint8Array.
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const generateProof = async (input: ProofInput): Promise<ProofReceipt> => {
  if (!input.contentHash.trim() || !input.generator.trim()) {
    throw new Error('Content Hash and Generator information are required.');
  }

  // Create a canonical object with only the provided fields to ensure deterministic hashing.
  const canonicalObject: { [key: string]: any } = {
      contentHash: input.contentHash,
      generator: input.generator,
  };
  if(input.prompt) canonicalObject.prompt = input.prompt;
  if(input.parentProofId) canonicalObject.parentProofId = input.parentProofId;

  const canonicalInput = JSON.stringify(canonicalObject, Object.keys(canonicalObject).sort());
  const inputHash = await sha256(canonicalInput);

  // Simulate generating a more complex proof
  const leaf1 = await sha256(`leaf-1-salt:${input.contentHash}`);
  const leaf2 = await sha256(`leaf-2-salt:${input.generator}`);
  
  // Simulate a signature
  const proofSignature = await sha256(`agent-private-key-signed:${inputHash}`);
  
  // Simulate Hedera entity IDs
  const randomId = Math.floor(100000 + Math.random() * 900000);
  const consensusTimestamp = new Date();
  const consensusTimestampStr = consensusTimestamp.toISOString();
  const hcsTxId = `0.0.${randomId}@${Math.floor(consensusTimestamp.getTime() / 1000)}`;

  const metadata = {
      agentId: 'proof-layer-agent-v1.1.0',
      proofMeshVersion: '1.0.0-alpha',
      hashingSchema: 'SHA-256',
      generator: input.generator,
      ...(input.prompt && { prompt: input.prompt }),
      ...(input.parentProofId && { parentProofId: input.parentProofId }),
  };

  return {
    status: 'success',
    proofId: crypto.randomUUID(),
    inputHash: inputHash,
    proof: {
      type: 'ProofStamp-Provenance',
      root: inputHash,
      leaves: [leaf1, leaf2],
      signature: proofSignature
    },
    anchor: {
      fileId: `0.0.${randomId}`,
      hcsTxId: hcsTxId,
      consensusTimestamp: consensusTimestampStr,
    },
    verification: {
      verified: true,
      reason: 'ok',
    },
    metadata,
  };
};