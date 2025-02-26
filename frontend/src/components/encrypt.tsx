import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { LockKeyhole, KeyRound } from "lucide-react";

import LZString from "lz-string";
import CryptoJS from "crypto-js";
import { JSEncrypt } from "jsencrypt";

export default function Encrypt() {
  const [loading, setLoading] = useState<boolean>(false);

  const [text, setText] = useState<string>("");
  const [threeDESKey, setThreeDESKey] = useState<string>("");
  const [RSAPublicKey, setRSAPublicKey] = useState<string>("");
  const [RSAPrivateKey, setRSAPrivateKey] = useState<string>("");

  function handleText(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleThreeDESKey(event: ChangeEvent<HTMLInputElement>) {
    setThreeDESKey(event.target.value);
  }

  function handleRSAPublicKey(event: ChangeEvent<HTMLInputElement>): void {
    setRSAPublicKey(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const compressedText = LZString.compressToEncodedURIComponent(text);

    setText("");
    setThreeDESKey("");
    setRSAPublicKey("");
    setRSAPrivateKey("");
  }

  function handleGenerateThreeDESKey(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setLoading(true);

    setTimeout(() => {
      const threeDESKey = CryptoJS.lib.WordArray.random(24).toString(
        CryptoJS.enc.Hex
      );

      setThreeDESKey(threeDESKey);

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
            <CardTitle className="text-2xl">Criptografar</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="text">Texto Claro</Label>
                  <Input
                    id="text"
                    type="text"
                    placeholder="Escreva o que deseja criptografar..."
                    required
                    onChange={handleText}
                    value={text}
                  ></Input>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="text">
                    Chave 3DES (192 bits, devido aos bits de paridade)
                  </Label>
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-2 w-full max-w-xl items-center">
                    <Input
                      id="threeDESKey"
                      type="text"
                      placeholder="Escreva ou gere sua chave 3DES..."
                      required
                      onChange={handleThreeDESKey}
                      value={threeDESKey}
                    ></Input>
                    <Button
                      className="w-full sm:w-auto"
                      onClick={handleGenerateThreeDESKey}
                    >
                      <KeyRound />
                      Gerar
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="text">Chave Pública RSA (2048 bits)</Label>
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-2 w-full max-w-xl items-center">
                    <Input
                      id="RSAPublicKey"
                      type="text"
                      placeholder="Escreva sua chave pública RSA ou gere suas chaves RSA..."
                      required
                      onChange={handleRSAPublicKey}
                      value={RSAPublicKey}
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
                {RSAPrivateKey && (
                  <div className="grid gap-2">
                    <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Chave Privada RSA (2048 bits)
                    </p>
                    <p className="text-sm opacity-70 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Salve-a em um lugar seguro e não a compartilhe, será útil
                      para descriptografar a mensagem recebida
                    </p>
                    <div className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                      {RSAPrivateKey}
                    </div>
                  </div>
                )}

                <Button type="submit">
                  <LockKeyhole />
                  Criptografar
                </Button>

                <div className="grid gap-2">
                  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Dados a serem enviados
                  </p>
                  <div className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors break-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-wrap">
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
