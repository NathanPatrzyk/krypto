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
import { KeyRound, LockKeyholeOpen } from "lucide-react";
import LZString from "lz-string";

export default function Decrypt() {
  const [ciphertext, setCiphertext] = useState<string>("");
  const [threeDESCipherKey, setThreeDESCipherKey] = useState<string>("");
  const [RSAPrivateKey, setRSAPrivateKey] = useState<string>("");
  const [RSAPublicKey, setRSAPublicKey] = useState<string>("");

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

  function handleGenerateRSAPrivateKey(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const RSAPrivateKey = CryptoJS.lib.WordArray.random(24).toString(
      CryptoJS.enc.HexRSAPrivateKey
    );
    setRSAPrivateKey(RSAPrivateKey);
  }
  function handleRSAPublicKey(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function handleGenerateThreeDESKey(
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    throw new Error("Function not implemented.");
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
                      onClick={handleGenerateRSAPrivateKey}
                    >
                      <KeyRound />
                      Gerar
                    </Button>
                  </div>
                </div>
                {/* <div className="grid gap-2">
                  <Label htmlFor="text">Chave Pública RSA (2048 bits)</Label>
                  <Input
                    id="RSAPublicKey"
                    type="text"
                    placeholder="Sua chave privada RSA gerada aparecerá aqui..."
                    required
                    onChange={handleRSAPublicKey}
                    value={RSAPublicKey}
                  ></Input>
                </div> */}

                <Button>
                  <LockKeyholeOpen />
                  Descriptografar
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
