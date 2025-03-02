import crypto from "crypto";
import forge from "node-forge";
import LZString from "lz-string";

export function generateThreeDESKey() {
  return crypto.randomBytes(24).toString("hex");
}

export async function generateRSAKeys() {
  return new Promise<{ RSAPublicKey: string; RSAPrivateKey: string }>(
    (resolve, reject) => {
      forge.pki.rsa.generateKeyPair(
        { bits: 2048, workers: -1 },
        (error, keypair) => {
          if (error) {
            reject(error);
            return;
          }

          resolve({
            RSAPublicKey: forge.pki.publicKeyToPem(keypair.publicKey),
            RSAPrivateKey: forge.pki.privateKeyToPem(keypair.privateKey),
          });
        }
      );
    }
  );
}

export function encryptWithThreeDES(text: string, threeDESKey: string) {
  const cipher = crypto.createCipheriv(
    "des-ede3",
    Buffer.from(threeDESKey, "hex"),
    Buffer.alloc(0, 0)
  );

  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
}

export function decryptWithThreeDES(ciphertext: string, threeDESKey: string) {
  const decipher = crypto.createDecipheriv(
    "des-ede3",
    Buffer.from(threeDESKey, "hex"),
    Buffer.alloc(0, 0)
  );

  let decrypted = decipher.update(ciphertext, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
}

export function compress(text: string) {
  return LZString.compressToEncodedURIComponent(text);
}

export function decompress(text: string) {
  return LZString.decompressFromEncodedURIComponent(text);
}
