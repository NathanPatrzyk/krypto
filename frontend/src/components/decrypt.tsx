import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { KeyRound, LockKeyholeOpen } from "lucide-react";

import LZString from "lz-string";
import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";

export default function Decrypt() {
  const [loading, setLoading] = useState<boolean>(false);

  const [ciphertext, setCiphertext] = useState<string>("");
  const [signedHash, setSignedHash] = useState<string>("");
  const [threeDESCipherKey, setThreeDESCipherKey] = useState<string>("");
  const [RSAPrivateKey, setRSAPrivateKey] = useState<string>("");
  const [RSAPublicKey, setRSAPublicKey] = useState<string>("");

  const [formattedText, setFormattedText] = useState<Array<string>>([""]);

  function handleCiphertext(event: ChangeEvent<HTMLInputElement>) {
    setCiphertext(event.target.value);
  }

  function handleSignedHash(event: ChangeEvent<HTMLInputElement>) {
    setSignedHash(event.target.value);
  }

  function handleThreeDESCipherKey(event: ChangeEvent<HTMLInputElement>) {
    setThreeDESCipherKey(event.target.value);
  }

  function handleRSAPrivateKey(event: ChangeEvent<HTMLInputElement>) {
    setRSAPrivateKey(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    setTimeout(() => {
      let crypt = new JSEncrypt();

      crypt.setPrivateKey(RSAPrivateKey);

      const decryptedThreeDESKey = crypt.decrypt(threeDESCipherKey);

      const decryptedCompressedText = CryptoJS.TripleDES.decrypt(
        ciphertext,
        CryptoJS.enc.Utf8.parse(decryptedThreeDESKey.toString()),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      ).toString(CryptoJS.enc.Utf8);

      const originalText = LZString.decompressFromEncodedURIComponent(
        decryptedCompressedText
      );

      const computedHash = CryptoJS.SHA256(decryptedCompressedText).toString(
        CryptoJS.enc.Hex
      );

      crypt = new JSEncrypt();

      crypt.setPublicKey(RSAPublicKey);

      const isSignatureValid = crypt.verify(
        computedHash,
        signedHash,
        CryptoJS.SHA256
      );

      if (!isSignatureValid) {
        alert("Digital signature verification failed.");
        setLoading(false);
        return;
      }

      setFormattedText([originalText]);

      setCiphertext("");
      setThreeDESCipherKey("");
      setRSAPublicKey("");
      setRSAPrivateKey("");

      setLoading(false);
    }, 200);
  }

  function handleGenerateRSAKeys(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setLoading(true);

    setTimeout(() => {
      const crypt = new JSEncrypt({ default_key_size: "2048" });

      const RSAPublicKey = crypt.getPublicKey();
      const RSAPrivateKey = crypt.getPrivateKey();

      setRSAPublicKey(RSAPublicKey);
      setRSAPrivateKey(RSAPrivateKey);

      setLoading(false);
    }, 200);
  }

  return (
    <div className="w-full max-w-xl">
      <div className="flex flex-col gap-6">
        <Card>
          {loading && (
            <p className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-t-xl p-2">
              <svg
                className="text-primary-foreground/30 animate-spin w-4 h-4"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                ></path>
              </svg>
              Carregando...
            </p>
          )}

          <CardHeader>
            <CardTitle className="text-2xl">Descriptografar</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="text">Texto Cifrado</Label>
                  <Input
                    id="ciphertext"
                    type="text"
                    placeholder="Escreva o que deseja descriptografar..."
                    required
                    onChange={handleCiphertext}
                    value={ciphertext}
                  ></Input>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signedHash">Assinatura Digital</Label>
                  <Input
                    id="signedHash"
                    type="text"
                    placeholder="Escreva sua assinatura digital..."
                    required
                    onChange={handleSignedHash}
                    value={signedHash}
                  ></Input>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="text">Chave 3DES Cifrada (RSA)</Label>
                  <Input
                    id="threeDESCipherKey"
                    type="text"
                    placeholder="Escreva sua chave 3DES cifrada..."
                    required
                    onChange={handleThreeDESCipherKey}
                    value={threeDESCipherKey}
                  ></Input>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="text">Chave Privada RSA (2048 bits)</Label>
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-2 w-full max-w-xl items-center">
                    <Input
                      id="RSAPrivateKey"
                      type="text"
                      placeholder="Escreva sua chave privada RSA ou gere suas chaves RSA..."
                      required
                      onChange={handleRSAPrivateKey}
                      value={RSAPrivateKey}
                    ></Input>
                    <Button
                      className="w-full sm:w-auto"
                      onClick={handleGenerateRSAKeys}
                    >
                      <KeyRound />
                      Gerar
                    </Button>
                  </div>
                </div>
                {RSAPublicKey && (
                  <div className="grid gap-2">
                    <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Chave Pública RSA (2048 bits)
                    </p>
                    <p className="text-sm opacity-70 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Compartilhe esta chave com quem precisar enviar mensagens
                      seguras para você, será utilizada para criptografar os
                      dados antes do envio.
                    </p>
                    <div className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                      {RSAPublicKey}
                    </div>
                  </div>
                )}

                <Button type="submit">
                  <LockKeyholeOpen />
                  Descriptografar
                </Button>

                <div className="grid gap-2">
                  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Texto Claro
                  </p>
                  <div className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    ...
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
