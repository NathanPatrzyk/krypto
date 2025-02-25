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
import { LockKeyholeOpen } from "lucide-react";
import LZString from "lz-string";

export default function Decrypt() {
  const [ciphertext, setCiphertext] = useState<string>("");
  const [threeDESCipherKey, setThreeDESCipherKey] = useState<string>("");
  const [RSAPrivateKey, setRSAPrivateKey] = useState<string>("");

  function handleCiphertext(event: ChangeEvent<HTMLInputElement>) {
    setCiphertext(event.target.value);
  }

  function handleThreeDESCipherKey(event: ChangeEvent<HTMLInputElement>) {
    setThreeDESCipherKey(event.target.value);
  }

  function handleRSAPrivateKey(event: ChangeEvent<HTMLInputElement>) {
    setRSAPrivateKey(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert(LZString.decompressFromEncodedURIComponent(ciphertext));

    setCiphertext("");
  }
  return (
    <div className="w-full max-w-xl">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Descriptografar</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="text">Texto Criptografado</Label>
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
                      onClick={handleGenerateThreeDESKey}
                    >
                      <KeyRound />
                      Gerar
                    </Button>
                  </div>
                </div>
                <Button>
                  <LockKeyholeOpen />
                  Descriptografar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
