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
import { Progress } from "./ui/progress";
import { decryptWithThreeDES } from "../utils/utils";
import { toast } from "sonner";
import { error } from "console";

export default function Decrypt() {
  const [progress, setProgress] = useState<number>(0);

  const [ciphertext, setCiphertext] = useState<string>("");
  const [signedHash, setSignedHash] = useState<string>("");
  const [threeDESCipherKey, setThreeDESCipherKey] = useState<string>("");
  const [RSAPublicKey, setRSAPublicKey] = useState<string>("");
  const [RSAPrivateKey, setRSAPrivateKey] = useState<string>("");

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

  function handleRSAPublicKey(event: ChangeEvent<HTMLInputElement>): void {
    setRSAPublicKey(event.target.value);
  }

  function handleRSAPrivateKey(event: ChangeEvent<HTMLInputElement>): void {
    setRSAPrivateKey(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setProgress(1);
    event.preventDefault();
    try {
      const text = decryptWithThreeDES(ciphertext, threeDESCipherKey);

      if (!ciphertext) {
        throw new Error("Erro ao descriptografar texto com 3DES.");
      }

      setFormattedText([text]);

      toast.promise(Promise.resolve(ciphertext), {
        loading: "Descriptografando texto com 3DES...",
        success: "Texto descriptografado com sucesso!",
        error: `${error}`,
      });

      setProgress(100);

      setTimeout(() => {
        setProgress(0);
      }, 500);
    } catch (error) {
      setProgress(0);
      toast.error(`${error}`);
    }
  }

  return (
    <div className="w-full max-w-xl">
      <div className="flex flex-col gap-6">
        <Card>
          {progress != 0 ? (
            <Progress value={progress} />
          ) : (
            <div className="h-2"></div>
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
                  <Label htmlFor="signedHash">Assinatura Digital</Label>
                  <Input
                    id="signedHash"
                    type="text"
                    placeholder="Escreva sua assinatura digital..."
                    // required
                    onChange={handleSignedHash}
                    value={signedHash}
                  ></Input>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="text">Chave Pública RSA (2048 bits)</Label>
                  <Input
                    id="RSAPublicKey"
                    type="text"
                    placeholder="Escreva a chave pública RSA do remetente..."
                    // required
                    onChange={handleRSAPublicKey}
                    value={RSAPublicKey}
                  ></Input>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="text">Chave Privada RSA (2048 bits)</Label>
                  <Input
                    id="RSAPrivateKey"
                    type="text"
                    placeholder="Escreva sua chave privada RSA..."
                    // required
                    onChange={handleRSAPrivateKey}
                    value={RSAPrivateKey}
                  ></Input>
                </div>

                <Button type="submit">
                  <LockKeyholeOpen />
                  Descriptografar
                </Button>

                <div className="grid gap-2">
                  <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Texto Claro
                  </p>
                  <div className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                    {formattedText &&
                      formattedText.map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
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
