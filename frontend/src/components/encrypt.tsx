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

export default function Encrypt() {
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const compressedText = LZString.compressToEncodedURIComponent(text);

    setText("");
    setThreeDESKey("");
  }

  function handleGenerateThreeDESKey(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const threeDESKey = CryptoJS.lib.WordArray.random(24).toString(
      CryptoJS.enc.Hex
    );
    setThreeDESKey(threeDESKey);
  }

  function handleRSAPublicKey(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="w-full max-w-xl">
      <div className="flex flex-col gap-6">
        <Card>
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
                      onClick={handleGenerateThreeDESKey}
                    >
                      <KeyRound />
                      Gerar
                    </Button>
                  </div>
                </div>
                {/* <div className="grid gap-2">
                  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Chave Privada RSA (2048 bits)
                  </p>
                  <p className="text-sm opacity-70 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Salve-a em um lugar seguro e não a compartilhe, será útil para descriptografar a
                    mensagem recebida
                  </p>
                  <div className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    Sua chave privada RSA gerada aparecerá aqui...
                  </div>
                </div> */}

                <Button type="submit">
                  <LockKeyhole />
                  Criptografar
                </Button>

                {/* <div className="grid gap-2">
                  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Dados a serem enviados
                  </p>
                  <div className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    ...
                  </div>
                </div> */}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
